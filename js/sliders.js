$(document).ready(function() {


    $(".btn-light").on('click', function() {
        $("#search").slideDown(700);
    });



    $(document).on('click', ".searchList li", function(event) {
        let inputFoods = $('#inputFoods');

        let grabItem = $(this).text();

        inputFoods[0].value = grabItem;

        $("#search").slideDown(700);
    });
});