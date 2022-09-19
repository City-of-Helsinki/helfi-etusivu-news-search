import { ReactiveComponent } from '@appbaseio/reactivesearch';
import { StateProvider } from '@appbaseio/reactivesearch';
import { useRef, useState } from 'react';

import Dropdown from '../components/form//Dropdown';
import SubmitButton from '../components/form/SubmitButton';
import IndexFields from '../enum/IndexFields';
import SearchComponents from '../enum/SearchComponents';
import useLanguageQuery from '../hooks/useLanguageQuery';
import type OptionType from '../types/OptionType';
import SelectionsContainer from './SelectionsContainer';

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

  const clearSelection = (selection: OptionType, selectionType: string) => {
    let state;
    let stateHandler;
    switch (selectionType) {
      case 'topics':
        state = [...topics];
        stateHandler = setTopics;
        break;
      case 'neighbourhoods':
        state = [...neighbourhoods];
        stateHandler = setNeighbourhoods;
        break;
      case 'groups':
        state = [...groups];
        stateHandler = setGroups;
        break;
      default:
        break;
    }

    const index = state?.findIndex((option) => {
      return option.value === selection.value;
    });

    if (index !== undefined && state && stateHandler) {
      state.splice(index, 1);
      stateHandler(state);
    }
  };

  return (
    <div className='news-form-wrapper'>
      <div className='news-form-container'>
        <h2>{Drupal.t('Filter news items', {}, { context: 'News archive filter results heading' })}</h2>
        <div className='news-form__filters-container'>
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
                label={Drupal.t('Topics', {}, { context: 'News archive topics label' })}
                placeholder={Drupal.t('All topics', {}, { context: 'News archive topics placeholder' })}
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
                label={Drupal.t('City disctricts', {}, { context: 'News archive neighbourhoods label' })}
                placeholder={Drupal.t(
                  'All city disctricts',
                  {},
                  { context: 'News archive neighbourhoods placeholder' }
                )}
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
                label={Drupal.t('Target groups', {}, { context: 'News archive groups label' })}
                placeholder={Drupal.t('All target groups', {}, { context: 'News archive groups placeholder' })}
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
                  {({ searchState }) => (
                    <div className='news-form__submit'>
                      <SubmitButton searchState={searchState} setQuery={setQuery} />
                    </div>
                  )}
                </StateProvider>
              );
            }}
          />
        </div>
        <SelectionsContainer
          clearSelection={clearSelection}
          clearSelections={clearSelections}
          filters={{
            topics: topics,
            neighbourhoods: neighbourhoods,
            groups: groups,
          }}
        />
      </div>
    </div>
  );
};

export default FormContainer;
