import React, { PropTypes } from 'react';
import ChartistGraph from 'react-chartist';


const GFDGraph = ({options, update}) => {
  <div>
    <ChartistGraph className="cfd-chart" data={options.data} options={options.options} type="Bar" />
  </div>
}
