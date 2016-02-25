$(document).ready(function () {
  $('.update-git').on('click', function (e) {
    console.log('Git Updating');
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/?update-git=true',
      success: function(data){
        console.log(data);
        console.log('Git Updated');
      }
    })
  })
});