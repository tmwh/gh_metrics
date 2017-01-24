let [chartLineData, pieChartData] =
  [
    {
      labels: [],
      series: [],
      colors:[]
    },
    {
      series: []
    }
  ];


$(()=> {
  let data = $('#line-chart').data('collection');
  let colors = $('#line-chart').data('label-colors');
  let days = $('#line-chart').data('days-of-week');

  chartLineData.labels = days

  if ($('#line-chart, #pie-chart').length) {
    if (data.length) {
      chartLineData.series = data
      chartLineData.colors = colors
    }

    let lineChart = new Chartist.Line('#line-chart', chartLineData, {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWidth: true,
      height: '400px'
    });

    let pieChart = new Chartist.Pie('#pie-chart', pieChartData, {})

    lineChart.on('draw', (context) => {
      if(context.type === 'line') {
        context.element.attr({
          style: `stroke: #${chartLineData.colors[context.seriesIndex]}`
        });
      }
    });
  }
});
