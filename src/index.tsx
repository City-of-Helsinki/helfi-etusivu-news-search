import './i18n';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from './search/SearchContainer';

const appName: string = 'helfi-etusivu-news-search';
const rootElement: HTMLElement | null = document.getElementById('helfi-etusivu-news-search');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <ReactiveBase app={appName} url={process.env.REACT_APP_ELASTIC_URL}>
        <SearchContainer />
      </ReactiveBase>
    </React.StrictMode>,
    document.getElementById('helfi-etusivu-news-search')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
