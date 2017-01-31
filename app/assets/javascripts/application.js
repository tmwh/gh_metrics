//= require jquery
//= require chartist
//= require materialize

//= require_tree ./components


$(document).ready(function () {
  $('select').material_select();

  $('.js-repositories-select, .js-date-range-radio').on('change', function(){
    $(this).closest('form').submit();
  });
});
