import { Button } from 'hds-react';
import { useCallback, useEffect, useState } from 'react';

import IndexFields from '../../enum/IndexFields';
import SearchComponents from '../../enum/SearchComponents';
import { useLanguageQuery } from '../../hooks/useLanguageQuery';
import useSearchParams from '../../hooks/useSearchParams';
import type BooleanQuery from '../../types/BooleanQuery';
import { TermsQuery } from '../../types/BooleanQuery';
import OptionType from '../../types/OptionType';

type SearchStateItem = {
  aggregations?: any;
  value: OptionType[];
};

type Props = {
  initialized: boolean;
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

export const SubmitButton = ({ initialized, searchState, setQuery }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const languageFilter = useLanguageQuery();
  const [, updateParams] = useSearchParams();

  const getQuery = useCallback(() => {
    let query: BooleanQuery = {
      bool: {
        must: [],
        filter: languageFilter.bool.filter,
      },
    };

    Object.keys(ComponentMap).forEach((key: string) => {
      const state = searchState[key] || null;
      const should: TermsQuery[] = [];

      if (state && state.value && state.value.length) {
        should.push({
          terms: {
            [ComponentMap[key]]: state.value.map((value: OptionType) => value.value),
          },
        });
      }

      if (should.length && query.bool?.must) {
        query.bool.must.push({ bool: { should: should, minimum_should_match: 1 } });
      }
    });

    let result = {
      query: query,
      value: 0,
    };

    if (query.bool?.must?.length) {
      result.value = query.bool.must.length;
    }

    return result;
  }, [languageFilter, searchState]);

  const onClick = () => {
    setQuery(getQuery());
    updateParams({
      [SearchComponents.NEIGHBOURHOODS]: searchState[SearchComponents.NEIGHBOURHOODS]?.value?.map(
        (value: OptionType) => value.value
      ),
      [SearchComponents.NEWS_GROUPS]: searchState[SearchComponents.NEWS_GROUPS]?.value?.map(
        (value: OptionType) => value.value
      ),
      [SearchComponents.TOPIC]: searchState[SearchComponents.TOPIC]?.value?.map((value: OptionType) => value.value),
    });
  };

  useEffect(() => {
    if (initialized && !mounted) {
      setQuery(getQuery());
      setMounted(true);
    }
  }, [getQuery, initialized, mounted, setMounted, setQuery]);

  return (
    <Button
      className='news-form__submit-button'
      disabled={!initialized}
      type='submit'
      onClick={onClick}
      variant='primary'
    >
      {Drupal.t('Filter')}
    </Button>
  );
};

export default SubmitButton;
