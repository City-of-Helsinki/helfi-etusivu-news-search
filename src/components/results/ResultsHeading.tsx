import { StateProvider } from '@appbaseio/reactivesearch';

import SearchComponents from '../../enum/SearchComponents';

//@todo implement filter check (after filters are implemented)
const filtersApplied = () => {
  return false;
};

export const ResultsHeading = () => {
  const { RESULTS } = SearchComponents;

  return (
    <StateProvider
      render={({ searchState }) => (
        <h2 className="news-archive__heading">
          {filtersApplied()
            ? Drupal.t(
                Drupal.t('News based on your choices', {}, { context: 'News archive heading with choices' }) +
                  ` (${searchState[RESULTS].hits ? searchState[RESULTS].hits.total : 0})`
              )
            : Drupal.t('All news items', {}, { context: 'News archive heading' })}
        </h2>
      )}
    />
  );
};

export default ResultsHeading;
