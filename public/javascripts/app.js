$(document).ready(function () {
  var issuesdata = {
    labels: [],
    datasets: [
      {
        label: "ready",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "progress",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label: "testing QA",
        fillColor: "rgba(100,187,205,0.2)",
        strokeColor: "rgba(100,187,205,1)",
        pointColor: "rgba(100,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  var ctx = $("#graphic").get(0).getContext("2d");
  var myLineChart = new Chart(ctx).Line(issuesdata, {});

  $('.update-git').on('click', function (e) {
    console.log('Git Updating');
    $.ajax({
      type: 'POST',
      url: '/?updategit=true',
      success: function(data){
        console.log(data);
        console.log('Git Updated');
      }
    })
  })
  $('.update-btn').on('click', function (e) {
    console.log('Git Updating');
    $.ajax({
      type: 'POST',
      url: '/',
      success: function(data){
        console.log(data);
        console.log('Git Updated');
      }
    })
  });
  $('#graph').on('submit', function (e, data) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      data: $('#graph').serialize(),
      url: '/issues/upload',
      success: function(data){
        myLineChart.destroy();
        var datesLabels = [];
        var processPoints = [];
        var readyPoints = [];
        var testingPoints = [];
        console.log(data);
        $.each(data, function(i, v){
          //issuesdata.labels = [];
          //var date = moment(v.day).format('MMM Do');
          datesLabels.push( moment(v.day).format('MMM Do') );
          processPoints.push(v['progress']);
          readyPoints.push(v['ready']);
          testingPoints.push(v['testing QA']);
          //v.day
        });
        issuesdata.labels= datesLabels;
        issuesdata.datasets[0].data = processPoints;
        issuesdata.datasets[1].data = readyPoints;
        issuesdata.datasets[2].data = testingPoints;
        var ctx = $("#graphic").get(0).getContext("2d");
        myLineChart = new Chart(ctx).Line(issuesdata, {});
        //console.log(data);
        //console.log('Git Updated');

      }
    })
  });


  //console.log(myLineChart);
});