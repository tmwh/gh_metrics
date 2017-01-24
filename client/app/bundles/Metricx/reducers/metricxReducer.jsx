import { combineReducers } from 'redux';
import { METRICX_NAME_UPDATE } from '../constants/MetricxConstants';

const name = (state = '', action) => {
  switch (action.type) {
    case METRICX_NAME_UPDATE:
      return action.text;
    default:
      return state;
  }
};

const metricxReducer = combineReducers({ name });

export default metricxReducer;
