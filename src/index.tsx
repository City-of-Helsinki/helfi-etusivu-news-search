import React from 'react';
import ReactDOM from 'react-dom';

import BaseContainer from './containers/BaseContainer';
import SearchContainer from './containers/SearchContainer';

const rootSelector: string = 'helfi-etusivu-news-search';
const rootElement: HTMLElement | null = document.getElementById(rootSelector);

if (rootElement) {
  const apiUrl = rootElement.dataset.elasticProxyUrl;

  ReactDOM.render(
    <React.StrictMode>
      <BaseContainer apiUrl={apiUrl}>
        <SearchContainer />
      </BaseContainer>
    </React.StrictMode>,
    rootElement
  );
}
