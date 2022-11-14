import { ReactiveComponent, StateProvider } from '@appbaseio/reactivesearch';
import { Fragment, useRef, useState } from 'react';

import Dropdown from '../components/form//Dropdown';
import SubmitButton from '../components/form/SubmitButton';
import IndexFields from '../enum/IndexFields';
import SearchComponents from '../enum/SearchComponents';
import useLanguageQuery from '../hooks/useLanguageQuery';
import useSearchParams from '../hooks/useSearchParams';
import InitialState from '../types/InitialState';
import SelectionsContainer from './SelectionsContainer';

type InitializationMap = {
  [key: string]: boolean;
};

type InitialParam = Omit<InitialState, 'page'>;

export const FormContainer = () => {
  const [initialized, setIinitialized] = useState<InitializationMap>({
    [SearchComponents.NEWS_GROUPS]: false,
    [SearchComponents.NEIGHBOURHOODS]: false,
    [SearchComponents.TOPIC]: false,
  });
  const languageFilter = useLanguageQuery();
  const submitButton = useRef<any>(null);
  const [initialParams] = useSearchParams();

  const initialize = (key: string) => {
    setIinitialized((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className='news-form-wrapper'>
      <div className='news-form-container'>
        <h2>{Drupal.t('Filter news items', {}, { context: 'News archive filter results heading' })}</h2>
        <div className='news-form__filters-container'>
          <StateProvider
            includeKeys={['value']}
            render={({ searchState }) => (
              <Fragment>
                <ReactiveComponent
                  componentId={SearchComponents.TOPIC}
                  defaultQuery={() => ({
                    aggs: {
                      [IndexFields.FIELD_NEWS_ITEM_TAGS]: {
                        terms: {
                          field: `${IndexFields.FIELD_NEWS_ITEM_TAGS}.keyword`,
                          order: { _key: 'asc' },
                          size: 100000,
                        },
                      },
                    },
                    query: languageFilter,
                  })}
                  render={({ aggregations, setQuery }) => (
                    <Dropdown
                      aggregations={aggregations}
                      componentId={SearchComponents.TOPIC}
                      initialize={initialize}
                      indexKey={`${IndexFields.FIELD_NEWS_ITEM_TAGS}`}
                      initialValue={initialParams[SearchComponents.TOPIC as keyof InitialParam] ?? []}
                      label={Drupal.t('Topics', {}, { context: 'News archive topics label' })}
                      weight={3}
                      searchState={searchState}
                      placeholder={Drupal.t('All topics', {}, { context: 'News archive topics placeholder' })}
                      setQuery={setQuery}
                    />
                  )}
                />
                <ReactiveComponent
                  componentId={SearchComponents.NEIGHBOURHOODS}
                  defaultQuery={() => ({
                    aggs: {
                      [IndexFields.FIELD_NEWS_NEIGHBOURHOODS]: {
                        terms: {
                          field: `${IndexFields.FIELD_NEWS_NEIGHBOURHOODS}.keyword`,
                          order: { _key: 'asc' },
                          size: 100000,
                        },
                      },
                    },
                    query: languageFilter,
                  })}
                  render={({ aggregations, setQuery }) => (
                    <Dropdown
                      aggregations={aggregations}
                      componentId={SearchComponents.NEIGHBOURHOODS}
                      indexKey={`${IndexFields.FIELD_NEWS_NEIGHBOURHOODS}`}
                      initialize={initialize}
                      initialValue={initialParams[SearchComponents.NEIGHBOURHOODS as keyof InitialParam] ?? []}
                      label={Drupal.t('City disctricts', {}, { context: 'News archive neighbourhoods label' })}
                      weight={2}
                      searchState={searchState}
                      placeholder={Drupal.t(
                        'All city disctricts',
                        {},
                        { context: 'News archive neighbourhoods placeholder' }
                      )}
                      setQuery={setQuery}
                    />
                  )}
                />
                <ReactiveComponent
                  componentId={SearchComponents.NEWS_GROUPS}
                  defaultQuery={() => ({
                    aggs: {
                      [IndexFields.FIELD_NEWS_GROUPS]: {
                        terms: {
                          field: `${IndexFields.FIELD_NEWS_GROUPS}.keyword`,
                          order: { _key: 'asc' },
                          size: 100000,
                        },
                      },
                    },
                    query: languageFilter,
                  })}
                  render={({ aggregations, setQuery }) => (
                    <Dropdown
                      aggregations={aggregations}
                      componentId={SearchComponents.NEWS_GROUPS}
                      indexKey={`${IndexFields.FIELD_NEWS_GROUPS}`}
                      initialize={initialize}
                      initialValue={initialParams[SearchComponents.NEWS_GROUPS as keyof InitialParam] ?? []}
                      label={Drupal.t('Target groups', {}, { context: 'News archive groups label' })}
                      searchState={searchState}
                      weight={1}
                      placeholder={Drupal.t('All target groups', {}, { context: 'News archive groups placeholder' })}
                      setQuery={setQuery}
                    />
                  )}
                  URLParams={true}
                />
              </Fragment>
            )}
          />
          <ReactiveComponent
            componentId={SearchComponents.SUBMIT}
            ref={submitButton}
            render={({ setQuery }) => {
              return (
                <StateProvider>
                  {({ searchState }) => {
                    return (
                      <div className='news-form__submit'>
                        <SubmitButton
                          initialized={!Object.values(initialized).includes(false)}
                          searchState={searchState}
                          setQuery={setQuery}
                        />
                      </div>
                    );
                  }}
                </StateProvider>
              );
            }}
          />
        </div>
        <StateProvider
          render={({ searchState, setSearchState }) => (
            <SelectionsContainer searchState={searchState} setSearchState={setSearchState} submitRef={submitButton} />
          )}
        />
      </div>
    </div>
  );
};

export default FormContainer;
