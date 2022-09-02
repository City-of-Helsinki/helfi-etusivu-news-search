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
        must: [],
        filter: languageFilter.bool.filter,
      },
    };

    Object.keys(ComponentMap).forEach((key: string) => {
      const state = searchState[key] || null;

      if (state && state.value) {
        state.value.forEach((value: string) =>
          query.bool.must.push({
            term: {
              [ComponentMap[key]]: value,
            },
          })
        );
      }
    });

    return {
      query: query,
      value: query.bool.must.length,
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
      className="news-form__submit-button"
      type="submit"
      theme="black"
      onClick={() => {
        setQuery(getQuery());
      }}
    >
      {Drupal.t('Filter')}
    </Button>
  );
};

export default SubmitButton;
