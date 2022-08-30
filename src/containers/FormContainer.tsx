import { ReactiveComponent } from '@appbaseio/reactivesearch';
import { StateProvider } from '@appbaseio/reactivesearch';
import { Button, IconCross } from 'hds-react';
import { useRef, useState } from 'react';

import Dropdown from '../components/form//Dropdown';
import SubmitButton from '../components/form/SubmitButton';
import IndexFields from '../enum/IndexFields';
import SearchComponents from '../enum/SearchComponents';
import useLanguageQuery from '../hooks/useLanguageQuery';
import type OptionType from '../types/OptionType';

type FormContainerParams = {
  initialState: {
    topics: OptionType[];
    neighbourhoods: OptionType[];
    groups: OptionType[];
  };
};

export const FormContainer = ({ initialState }: FormContainerParams) => {
  const [topics, setTopics] = useState(initialState.topics);
  const [neighbourhoods, setNeighbourhoods] = useState(initialState.neighbourhoods);
  const [groups, setGroups] = useState(initialState.groups);
  const languageFilter = useLanguageQuery();
  const submitButton = useRef<any>(null);

  const clearSelections = () => {
    setTopics([]);
    setNeighbourhoods([]);
    setGroups([]);

    if (submitButton && submitButton.current) {
      submitButton.current.setQuery({ query: null });
    }
  };

  return (
    <div className="news-form-wrapper">
      <div className="news-form-container">
        <ReactiveComponent
          componentId={SearchComponents.TOPIC}
          defaultQuery={() => ({
            aggs: {
              [IndexFields.FIELD_NEWS_ITEM_TAGS]: {
                terms: {
                  field: `${IndexFields.FIELD_NEWS_ITEM_TAGS}.keyword`,
                  order: { _key: 'asc' },
                },
              },
            },
            query: languageFilter,
          })}
          render={({ aggregations, setQuery }) => (
            <Dropdown
              aggregations={aggregations}
              indexKey={`${IndexFields.FIELD_NEWS_ITEM_TAGS}`}
              label={Drupal.t('Topics')}
              placeholder={Drupal.t('All topics')}
              setQuery={setQuery}
              setValue={setTopics}
              value={topics}
            />
          )}
          URLParams={true}
        />
        <ReactiveComponent
          componentId={SearchComponents.NEIGHBOURHOODS}
          defaultQuery={() => ({
            aggs: {
              [IndexFields.FIELD_NEWS_NEIGHBOURHOODS]: {
                terms: {
                  field: `${IndexFields.FIELD_NEWS_NEIGHBOURHOODS}.keyword`,
                  order: { _key: 'asc' },
                },
              },
            },
            query: languageFilter,
          })}
          render={({ aggregations, setQuery }) => (
            <Dropdown
              aggregations={aggregations}
              indexKey={`${IndexFields.FIELD_NEWS_NEIGHBOURHOODS}`}
              label={Drupal.t('Neighbourhoods')}
              placeholder={Drupal.t('All neighbourhoods')}
              setQuery={setQuery}
              setValue={setNeighbourhoods}
              value={neighbourhoods}
            />
          )}
          URLParams={true}
        />
        <ReactiveComponent
          componentId={SearchComponents.NEWS_GROUPS}
          defaultQuery={() => ({
            aggs: {
              [IndexFields.FIELD_NEWS_GROUPS]: {
                terms: {
                  field: `${IndexFields.FIELD_NEWS_GROUPS}.keyword`,
                  order: { _key: 'asc' },
                },
              },
            },
            query: languageFilter,
          })}
          render={({ aggregations, setQuery }) => (
            <Dropdown
              aggregations={aggregations}
              indexKey={`${IndexFields.FIELD_NEWS_GROUPS}`}
              label={Drupal.t('Groups')}
              placeholder={Drupal.t('Groups')}
              setQuery={setQuery}
              setValue={setGroups}
              value={groups}
            />
          )}
          URLParams={true}
        />
        <ReactiveComponent
          componentId={SearchComponents.SUBMIT}
          ref={submitButton}
          render={({ setQuery }) => {
            return (
              <StateProvider includeKeys={['value']}>
                {({ searchState }) => <SubmitButton searchState={searchState} setQuery={setQuery} />}
              </StateProvider>
            );
          }}
        />
        <div className="news-form__clear-all">
          <Button
            aria-label={Drupal.t('Clear all selections')}
            className="news-form__clear-all-button"
            iconLeft={<IconCross />}
            onClick={clearSelections}
            variant="supplementary"
          >
            {Drupal.t('Clear selections')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
