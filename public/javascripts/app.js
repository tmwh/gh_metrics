$(document).ready(function () {
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
  })
});