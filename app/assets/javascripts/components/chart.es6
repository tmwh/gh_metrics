let [chartLineData, pieChartData] =
  [
    {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      series: [
        [1, 5, 2, 5, 4, 3],
        [2, 3, 4, 8, 1, 2],
        [5, 4, 3, 2, 1, 12]
      ]
    },
    {
      series: [5,4,3]
    }
  ];


$(()=> {
  if ($('#line-chart, #pie-chart').length) {
    let lineChart = new Chartist.Line('#line-chart', chartLineData, {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWidth: true
    });

    let pieChart = new Chartist.Pie('#pie-chart', pieChartData, {})
  }
});
