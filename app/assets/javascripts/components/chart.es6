let [chartLineData, pieChartData] =
  [
    {
      labels: [],
      series: [],
      colors: []
    },
    {
      series: []
    }
  ];


$(()=> {
  let data = $('#line-chart').data('collection');
  let colors = $('#line-chart').data('label-colors');
  let days = $('#line-chart').data('days');

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
