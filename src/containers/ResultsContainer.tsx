import { ReactiveList } from '@appbaseio/reactivesearch';

import ResultCard from '../components/results/ResultCard';
import ResultsHeading from '../components/results/ResultsHeading';
import SearchComponents from '../enum/SearchComponents';
import useLanguageQuery from '../hooks/useLanguageQuery';
import Result from '../types/Result';

type ResultsData = {
  data: Result[];
};

const ResultsContainer = () => {
  const languageFilter = useLanguageQuery();

  return (
    <div className="news-wrapper">
      <ResultsHeading />
      <ReactiveList
        className="news-container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        pages={3}
        pagination={true}
        defaultQuery={() => ({
          query: {
            ...languageFilter,
          },
        })}
        render={({ data }: ResultsData) => (
          <ul className="news-listing news-listing--teasers">
            {data.map((item: Result) => (
              <ResultCard key={item._id} {...item} />
            ))}
          </ul>
        )}
        renderNoResults={() => (
          <div className="news-listing__no-results">
            {Drupal.t('No results found', {}, { context: 'News archive no results' })}
          </div>
        )}
        react={{
          and: [SearchComponents.SUBMIT],
        }}
        showResultStats={false}
        size={10}
      />
    </div>
  );
};

export default ResultsContainer;
