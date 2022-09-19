import { Button } from 'hds-react';
import { useCallback, useEffect, useState } from 'react';

import IndexFields from '../../enum/IndexFields';
import SearchComponents from '../../enum/SearchComponents';
import { useLanguageQuery } from '../../hooks/useLanguageQuery';
import type BooleanQuery from '../../types/BooleanQuery';

type SearchStateItem = {
  value: Array<string>;
};

type Props = {
  searchState: {
    [key: string]: SearchStateItem;
  };
  setQuery: Function;
};

export const ComponentMap = {
  [SearchComponents.TOPIC]: `${IndexFields.FIELD_NEWS_ITEM_TAGS}.keyword`,
  [SearchComponents.NEIGHBOURHOODS]: `${IndexFields.FIELD_NEWS_NEIGHBOURHOODS}.keyword`,
  [SearchComponents.NEWS_GROUPS]: `${IndexFields.FIELD_NEWS_GROUPS}.keyword`,
};

export const SubmitButton = ({ searchState, setQuery }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const languageFilter = useLanguageQuery();
  const getQuery = useCallback(() => {
    let query: BooleanQuery = {
      bool: {
        should: [],
        filter: languageFilter.bool.filter,
      },
    };

    Object.keys(ComponentMap).forEach((key: string) => {
      const state = searchState[key] || null;

      if (state && state.value) {
        state.value.forEach((value: string) =>
          query.bool.should.push({
            term: {
              [ComponentMap[key]]: value,
            },
          })
        );
      }
    });

    query.bool.minimum_should_match = Number(query.bool.should.length > 0);

    return {
      query: query,
      value: query.bool.should.length,
    };
  }, [languageFilter, searchState]);

  useEffect(() => {
    if (mounted) {
      return;
    }

    setQuery(getQuery());
    setMounted(true);
  }, [getQuery, setQuery, mounted, setMounted]);

  return (
    <Button
      className='news-form__submit-button'
      type='submit'
      onClick={() => {
        setQuery(getQuery());
      }}
      variant='primary'
    >
      {Drupal.t('Filter')}
    </Button>
  );
};

export default SubmitButton;
