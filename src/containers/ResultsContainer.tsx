import { ReactiveList } from '@appbaseio/reactivesearch';

import ResultCard from '../components/results/ResultCard';
import ResultsHeading from '../components/results/ResultsHeading';
import SearchComponents from '../enum/SearchComponents';
import useLanguageQuery from '../hooks/useLanguageQuery';
import Result from '../types/Result';

const ResultsContainer = () => {
  const languageFilter = useLanguageQuery();

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
        defaultQuery={() => ({
          query: {
            ...languageFilter,
          },
        })}
        render={({ data }: any) => (
          <ul className="news-listing news-listing--teasers">
            {data.map((item: Result) => (
              <ResultCard key={item._id} {...item} />
            ))}
          </ul>
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
