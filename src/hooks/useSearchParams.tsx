import { MutableRefObject, useRef } from 'react';

import InitialState from '../types/InitialState';

type UpdateOptions = {
  groups?: any;
  neighbourhoods?: any;
  topic?: any;
  page?: number;
};

const paramsToState = (params: MutableRefObject<URLSearchParams>) => {
  let initialParams: InitialState = {
    groups: [],
    neighbourhoods: [],
    topic: [],
  };

  const keys = Object.keys(initialParams);
  const entries = params.current.entries();
  let result = entries.next();
  while (!result.done) {
    const [key, value] = result.value;
    const matchedKey = keys.find((stateKey) => key.includes(stateKey));

    if (matchedKey) {
      initialParams[matchedKey as keyof Omit<InitialState, 'page'>]?.push(value);
    }

    result = entries.next();
  }

  const intialPage = params.current.get('page');
  if (intialPage) {
    initialParams.page = Number(intialPage) - 1;
  }

  return initialParams;
};

const useSearchParams = () => {
  const urlSearchParams = useRef<URLSearchParams>(new URLSearchParams(window.location.search));
  const initialParams = paramsToState(urlSearchParams);

  const updateUrl = (urlSearchParams: MutableRefObject<URLSearchParams>) => {
    const newUrl = new URL(window.location.pathname, window.location.origin);
    newUrl.search = urlSearchParams.current.toString();
    window.history.pushState({}, '', newUrl.toString());
  };

  const updateParams = (options: UpdateOptions) => {
    urlSearchParams.current = new URLSearchParams();
    for (const key in options) {
      const selections = options[key as keyof UpdateOptions];

      if (key === 'page') {
        urlSearchParams.current.set(key, selections);
      } else if (selections?.length) {
        const values = selections.map((selection: any) => selection);
        urlSearchParams.current.set(key, JSON.stringify(values));
      }
    }

    updateUrl(urlSearchParams);
  };

  return [initialParams, updateParams] as const;
};

export default useSearchParams;
