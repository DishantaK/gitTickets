$( document ).ready(function() {
  $(" .dropdown-item").click(function() {
    console.log("changed");
    var selectedVal = $(this).attr('data-value');
    console.log(selectedVal);
  });
});
