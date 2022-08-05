import { ReactiveList } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';
import Result from '../types/Result';
import ResultCard from './ResultCard';

const ResultsContainer = () => {
  const getHeaderText = () => {
    // @todo implement filter check
    const filterApplied = false;
    const text = filterApplied
      ? Drupal.t('News based on your choices')
      : Drupal.t('All news items', {}, { context: 'News archive heading' });

    return text;
  };

  return (
    <div>
      <div>
        <h2 className="news-archive__heading">{getHeaderText()}</h2>
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
