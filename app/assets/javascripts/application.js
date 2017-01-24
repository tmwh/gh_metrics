//= require webpack-bundle

//= require jquery
//= require chartist
//= require materialize

//= require_tree ./components

$(document).ready(function () {
  $('select').material_select();

  $('.js-repositories-select').on('change', function(){
    $(this).closest('form').submit();
  });
});
