import SearchComponents from '../enum/SearchComponents';
import type OptionType from '../types/OptionType';
import FormContainer from './FormContainer';
import ResultsContainer from './ResultsContainer';

const SearchContainer = () => {
  const transformParams = (paramValue: string | null): OptionType[] => {
    if (!paramValue) {
      return [];
    }

    return JSON.parse(paramValue).map((value: string) => ({ label: value, value: value }));
  };

  const getInitialParams = () => {
    const params = new URLSearchParams(window.location.search);

    return {
      topics: transformParams(params.get(SearchComponents.TOPIC)) ?? [],
      neighbourhoods: transformParams(params.get(SearchComponents.NEIGHBOURHOODS)) ?? [],
      groups: transformParams(params.get(SearchComponents.NEWS_GROUPS)) ?? [],
    };
  };

  return (
    <div>
      <FormContainer initialState={getInitialParams()} />
      <ResultsContainer />
    </div>
  );
};

export default SearchContainer;
