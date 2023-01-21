//when nav clicked (When its on Phone res), do as this code said
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    $("body").toggleClass('stop-scroll');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});
//Scroll listener page
$(window).scroll(function() {
    //Handling nav fade in and out
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        $('.navTrigger-i').addClass('affix-color');
        $('.trolley-img').addClass('trolley-green');
    } else {
        $('.nav').removeClass('affix');
        $('.navTrigger-i').removeClass('affix-color');
        $('.trolley-img').removeClass('trolley-green');
    }
});

//Listener for window resize
$(window).resize(function() {
    if ($(window).width() > 768 ) {
        //both of this code handling for overfow-y of body to hidden when nav bar is opened(phone res)
        //if scroll still stopped but screen more than 768
        if($('body').hasClass('stop-scroll')) {
            $('body').toggleClass('stop-scroll')
        }
    }

    if ($(window).width() < 768 ) {
        //if scroll still available, but screen lower than 768
        if($('#mainListDiv').hasClass("show_list")) {
            if(!$('body').hasClass('stop-scroll')) {
                $('body').toggleClass('stop-scroll')
            }
        }
    }
})