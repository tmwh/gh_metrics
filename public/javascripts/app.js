$(document).ready(function () {


  function loadGraphData() {
    $.ajax({
      type: 'POST',
      data: $('#graph').serialize(),
      url: '/issues/upload',
      success: function (data) {
        $.each(data, function (index, v) {
          datesLabels.push(moment(v.day).format('MMM Do'));
          Object.keys(v).forEach(function (value, i) {
            if (value != 'day') {
              if (!seriesData[i]) {
                seriesData[i] = []
              }
              seriesData[i].push(v[value]);
            }
          });
        });

        chartConfig.labels = datesLabels;
        chartConfig.series = seriesData;

        if (chart) {
          chart.update(chartConfig);
        } else {
          var chart = new Chartist.Line('#graphic', chartConfig, {
            low: 0,
            showLabel: true,
            showArea: true
          });
          chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
              data.element.animate({
                d: {
                  begin: 500 * data.index,
                  dur: 1000,
                  from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            }
          });
        }
      }
    })
  }

  $('.update-git').on('click', function (e) {
    console.log('Git Updating');
    $.ajax({
      type: 'POST',
      url: '/?updategit=true',
      success: function (data) {
        console.log('Git Updated');
      }
    })
  });

  if ($("#graphic").length > 0) {
    var chartConfig = {labels: [], series: []};
    var datesLabels = [];
    var seriesData = [];

    loadGraphData();
  }

  $('#graph').on('submit', function (e) {
    e.preventDefault();
    datesLabels = [];
    seriesData = [];
    loadGraphData();
  });
});