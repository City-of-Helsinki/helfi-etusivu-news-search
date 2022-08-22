import { ReactiveList } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';
import Result from '../types/Result';
import ResultCard from './ResultCard';
import ResultsHeading from './ResultsHeading';

const ResultsContainer = () => {
  return (
    <div>
      <div>
        <ResultsHeading />
      </div>
      <ReactiveList
        className="news-container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        pages={3}
        pagination={true}
        render={({ data }: any) => (
          <ul className="news-listing news-listing--teasers">
            {data.map((item: Result) => (
              <ResultCard key={item._id} {...item} />
            ))}
          </ul>
        )}
        showResultStats={false}
        size={10}
      />
    </div>
  );
};

export default ResultsContainer;
