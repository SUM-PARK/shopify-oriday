$(document).ready(function() {
    console.log('downloadables');
    setTimeout(() => downloadables(),1);
});
// Downloadables cookie check
function downloadables() {
    var cookies = document.cookie.split(';');
    var check = false;

    for (i = 0; i < cookies.length; i++) {
        if (check == false) {
            if (cookies[i].indexOf('oridaySignedUp') > -1) {
                check = true;
            }
        }
    }

    if(check) {
        // Set downloadables link to downloadable
        $('.login-control').removeClass('inactive').addClass('active');
    } else {
        $('.login-control').removeClass('active').addClass('inactive');
    }
}
$(document).on('click', '.downloadable-page-form button', function(){
    console.log('subscribe button');
    downloadablesNewsletter();
})

function downloadablesNewsletter() {
    var email = $('.downloadable-page-form input').val();
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

            // Set downloadables newsletter signup cookie
            var d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
            var expires = "expires=" + d.toGMTString();
            document.cookie = "oridaySignedUp=enabled; " + expires;

            // Set downloadables link to downloadable
            $('.login-control').addClass('active');
            $('.login-control').removeClass('inactive');

            console.log('subscribed');
        },
        error: function(error) {
            console.log('subscribe fail');
        }
    });
}