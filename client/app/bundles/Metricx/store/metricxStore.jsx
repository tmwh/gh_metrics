import { createStore } from 'redux';
import metricxReducer from '../reducers/metricxReducer';

const configureStore = (railsProps) => (
  createStore(metricxReducer, railsProps)
);

export default configureStore;
