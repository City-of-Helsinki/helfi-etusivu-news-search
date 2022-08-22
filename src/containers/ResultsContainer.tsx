import { ReactiveList } from '@appbaseio/reactivesearch';
import { useRef } from 'react';

import ResultCard from '../components/results/ResultCard';
import ResultsHeading from '../components/results/ResultsHeading';
import SearchComponents from '../enum/SearchComponents';
import useLanguageQuery from '../hooks/useLanguageQuery';
import useOnScreen from '../hooks/useOnScreen';
import Pagination from '../search/Pagination';
import Result from '../types/Result';

type ResultsData = {
  data: Result[];
};

const ResultsContainer = () => {
  const resultsWrapper = useRef<HTMLDivElement | null>(null);
  const wrapperIntersecting = useOnScreen(resultsWrapper);
  const languageFilter = useLanguageQuery();

  const onPageChange = () => {
    if (resultsWrapper && resultsWrapper.current && !wrapperIntersecting) {
      resultsWrapper.current.scrollIntoView();
    }
  };

  return (
    <div ref={resultsWrapper} className="news-wrapper">
      <ResultsHeading />
      <ReactiveList
        className="news-container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        onPageChange={onPageChange}
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
        renderPagination={(props) => <Pagination {...props} />}
        react={{
          and: [SearchComponents.SUBMIT],
        }}
        showResultStats={false}
        size={1}
        URLParams={true}
      />
    </div>
  );
};

export default ResultsContainer;
