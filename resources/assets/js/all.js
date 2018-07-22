function getCats(category) {

    var filter = null;

    if (category === undefined) {
        filter = '&type=jpg,png';
    }
    else if (category === "action") {
        filter = '&type=gif';
    }
    else {
        filter = '&type=jpg,png&category=' + category;
    }

    $.ajax({
        url: 'http://thecatapi.com/api/images/get?format=xml&results_per_page=20' + filter,
        crossDomain: true,
        method: 'GET',
        success: function (data) {

            var i;
            var catUrl = [];
            var results = data.getElementsByTagName("url");

            for (i = 0; i < results.length; i++) {
                catUrl.push(results[i].innerHTML);
            }

            var templateScript = Handlebars.compile($('#handlebars-demo').html());

            $('#catGrid').html(templateScript({catLink: catUrl}));
        }
    });
}

// Get default cats
getCats();

// Add active class to mobile menu
$("#mobile-menu").click(function () {
    if ($(this).hasClass("is-active")) {
        $(this).removeClass("is-active");
    } else {
        $(this).addClass("is-active");
    }
});

// Add active class to sort menu
$('.sort-menu li').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
});