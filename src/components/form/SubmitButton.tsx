import { Button } from 'hds-react';

import IndexFields from '../../enum/IndexFields';
import SearchComponents from '../../enum/SearchComponents';
import { useLanguageQuery } from '../../hooks/useLanguageQuery';

type Props = {
  searchState: any;
  setQuery: Function;
};

export const ComponentMap = {
  [SearchComponents.TOPIC]: `${IndexFields.FIELD_NEWS_ITEM_TAGS}.keyword`,
  [SearchComponents.NEIGHBOURHOODS]: `${IndexFields.FIELD_NEWS_NEIGHBOURHOODS}.keyword`,
  [SearchComponents.NEWS_GROUPS]: `${IndexFields.FIELD_NEWS_GROUPS}.keyword`,
};

export const SubmitButton = ({ searchState, setQuery }: Props) => {
  const languageFilter = useLanguageQuery();

  return (
    <Button
      type="submit"
      theme="black"
      onClick={() => {
        let query: any = {
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

        setQuery({
          query: query,
        });
      }}
    >
      {Drupal.t('Filter')}
    </Button>
  );
};

export default SubmitButton;
