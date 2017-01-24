import React from 'react';
import { Provider } from 'react-redux';


import configureStore from '../store/metricxStore';
import MetricxContainer from '../containers/MetricxContainer';


const MetricxApp = (props, _railsContext) => (
  <Provider store={configureStore(props)}>
    <MetricxContainer />
  </Provider>
);

export default MetricxApp;
