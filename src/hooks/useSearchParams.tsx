import { MutableRefObject, useRef } from 'react';

import InitialState from '../types/InitialState';

type UpdateOptions = {
  groups?: any;
  neighbourhoods?: any;
  topic?: any;
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
      initialParams[matchedKey as keyof InitialState]?.push(value);
    }

    result = entries.next();
  }

  return initialParams;
};

const useSearchParams = () => {
  let urlSearchParams = useRef<URLSearchParams>(new URLSearchParams(window.location.search));
  const initialParams = paramsToState(urlSearchParams);

  const updateUrl = (urlSearchParams: MutableRefObject<URLSearchParams>) => {
    let allParamsString = '';
    const baseUrl = window.location.origin;
    const entries = urlSearchParams.current.entries();
    let result = entries.next();

    while (!result.done) {
      const [key, value] = result.value;
      const parsedValue = JSON.parse(value);
      let paramString = '';

      for (let i = 0; i < parsedValue.length; i++) {
        if (paramString.length) {
          paramString += '&';
        }

        paramString += `${key}[${i}]=${parsedValue[i].replaceAll(' ', '+').toLowerCase()}`;
      }

      allParamsString += allParamsString.length ? '&' + paramString : paramString;
      result = entries.next();
    }

    window.history.pushState({}, '', `${baseUrl}?${allParamsString}`);
  };

  const updateParams = (options: UpdateOptions) => {
    urlSearchParams.current = new URLSearchParams();
    for (const key in options) {
      const selections = options[key as keyof UpdateOptions];

      if (selections?.length) {
        const values = selections.map((selection: any) => selection);
        urlSearchParams.current.set(key, JSON.stringify(values));
      }
    }

    updateUrl(urlSearchParams);
  };

  return [initialParams, updateParams] as const;
};

export default useSearchParams;
