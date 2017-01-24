/* eslint-disable import/prefer-default-export */

import { METRICX_NAME_UPDATE } from '../constants/MetricxConstants.jsx';

export const updateValue = (text) => ({
  type: METRICX_NAME_UPDATE,
  text,
});
