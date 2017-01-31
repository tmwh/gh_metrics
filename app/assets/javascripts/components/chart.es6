let [chartLineData, pieChartData] =
  [
    {
      labels: [],
      series: [],
      colors: []
    },
    {
      series: [],
      colors: []
    }
  ];


$(()=> {
  let lineData = $('#line-chart').data('collection');
  let lineColors = $('#line-chart').data('label-colors');
  let lineDays = $('#line-chart').data('days');
  let pieData = $('#pie-chart').data('collection');
  let pieColors = $('#pie-chart').data('label-colors');

  chartLineData.labels = lineDays

  if ($('#line-chart, #pie-chart').length) {
    if (lineData.length) {
      chartLineData.series = lineData
      chartLineData.colors = lineColors
    }

    if (pieData.length) {
      pieChartData.series = pieData
      pieChartData.colors = pieColors
    }

    let lineChart = new Chartist.Line('#line-chart', chartLineData, {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWidth: true,
      height: '400px'
    });

    let pieChart = new Chartist.Pie('#pie-chart', pieChartData, {
      height: '400px',
      chartPadding: 30,
      labelOffset: 100
    });

    pieChart.on('draw', (context) => {
      if (context.type === 'slice') {
        context.element.attr({
          style: `fill: #${pieChartData.colors[context.index]}`
        });
      }
    });

    lineChart.on('draw', (context) => {
      if (context.type === 'line') {
        context.element.attr({
          style: `stroke: #${chartLineData.colors[context.seriesIndex]}`
        });
      }
    });
  }


  $('#project_selection').on('change', (e) => {
    let [ url, param, labels_list] = [
      $(e.target).closest('.js-project-selection').data('url'),
      $(e.target).val(),
      $('.js-labels-list')];

    fetch(`${url}?repository=${param}`)
      .then((response) => {
        return response.json();
      })
      .then((labels) => {
        labels_list.html(labels.html);
        labels_list.find('select').material_select();
      })
      .catch((err) => {
        Materialize.toast('Something went wrong', 4000);
      });
  })
});
