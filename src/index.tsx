import { ReactiveBase } from '@appbaseio/reactivesearch';
import React from 'react';
import ReactDOM from 'react-dom';

import Settings from './enum/Settings';
import './i18n';
import SearchContainer from './search/SearchContainer';
import * as serviceWorker from './serviceWorker';

const rootSelector: string = 'helfi-etusivu-news-search';
const rootElement: HTMLElement | null = document.getElementById(rootSelector);

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <ReactiveBase app={Settings.INDEX} url={process.env.REACT_APP_ELASTIC_URL}>
        <SearchContainer />
      </ReactiveBase>
    </React.StrictMode>,
    document.getElementById(rootSelector)
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
