$(document).ready(function() {
    console.log('printables');
    printables();
});
// Printables cookie check
function printables() {
    var cookies = document.cookie.split(';');
    var check = false;
    for (i = 0; i < cookies.length; i++) {
        if (check == false) {
            if (cookies[i].indexOf('oridaySignedUp') > -1) {
                check = true;
                $('.printables .meta').addClass('active');
                $('.printable').addClass('active');
            }
        }
    }
}
// Newsletter subscription
$('.printables-form button').click(function () {
    console.log('subscribe button');
    printablesNewsletter();
});
function printablesNewsletter() {
    var email = $('.printables-form input').val();
    if(!email) {
        return;
    }
    const bodyObj = { email };

    $.ajax({
        type: "POST",
        url: "https://em4q9hguia.execute-api.ap-northeast-2.amazonaws.com/Prod/subscribers",
        data: JSON.stringify(bodyObj),
        success: function (res) {
            console.log(res);

            // Set printables newsletter signup cookie
            var d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
            var expires = "expires=" + d.toGMTString();
            document.cookie = "oridaySignedUp=enabled; " + expires;

            // Set printables link to downloadable
            $('.printables .meta').addClass('active');
            $('.printable').addClass('active');

            console.log('subscribed');
        },
        error: function(error) {
            console.log('subscribe fail');
        }
    });
}