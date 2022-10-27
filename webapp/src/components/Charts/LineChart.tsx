import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { lineChartData, lineChartOptions } from 'variables/charts';

const LineChart = () => {
  return (
    <ReactApexChart
      options={lineChartOptions}
      series={lineChartData}
      type='area'
      width='100%'
      height='100%'
    />
  );
};

export default LineChart;
