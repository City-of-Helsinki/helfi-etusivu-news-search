import { ReactiveList } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';
import Result from '../types/Result';
import ResultCard from './ResultCard';

const ResultsContainer = () => {
  const getHeaderText = () => {
    // @todo implement filter check
    const filterApplied = false;
    const text = filterApplied ? 'News based on your choices' : 'All news';

    return text;
  };

  return (
    <div>
      <div>
        <h3>{getHeaderText()}</h3>
      </div>
      <ReactiveList
        className="news-container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        pages={3}
        pagination={true}
        render={({ data }: any) => (
          <ReactiveList.ResultCardsWrapper className="results-wrapper">
            {data.map((item: Result) => (
              <ResultCard key={item._id} {...item} />
            ))}
          </ReactiveList.ResultCardsWrapper>
        )}
        size={10}
      />
    </div>
  );
};

export default ResultsContainer;
