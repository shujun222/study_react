import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line
import OurChartCard, {TestChart} from './antd3/OurChartCard';
import AntCharts from './antd3/AntCharts';
import {NormalForm} from './antd3/normalForm';
import {tellType} from './basic_js/tellType'


ReactDOM.render(
  <>
    <TestChart />
    <AntCharts />
  </>,
  document.getElementById('root')
);