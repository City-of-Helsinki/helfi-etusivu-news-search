import { ReactiveBase } from '@appbaseio/reactivesearch';

import Settings from '../enum/Settings';

type Props = {
  apiUrl: string | undefined;
  children: React.ReactElement;
};

const BaseContainer = ({ apiUrl, children }: Props) => {
  if (!apiUrl && !process.env.REACT_APP_ELASTIC_URL) {
    return null;
  }

  return (
    <ReactiveBase
      app={Settings.INDEX}
      url={apiUrl || process.env.REACT_APP_ELASTIC_URL}
      theme={{
        colors: {
          primaryColor: 'inherit',
        },
        typography: {
          fontFamily: 'inherit',
        },
      }}
    >
      {children}
    </ReactiveBase>
  );
};

export default BaseContainer;
