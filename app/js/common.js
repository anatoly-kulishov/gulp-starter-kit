jQuery(document).ready(function ($) {
    "use strict";

    /**
     *  Base Script
     *  -----------
     * */
    $('html').removeClass('no-js');

    // if ($("html").hasClass("no-js")) {
    //     $('.hamburger').addClass('is-active');
    // } else {
    //     $('.hamburger').removeClass('is-active');
    // }

    /**
     *  Hamburger Event
     *  ---------------
     * */
    // $('.hamburger').click(function () {
    //     $(this).toggleClass('is-active');
    //     $('html').toggleClass('locked');
    //     $('.page-header__wrapper').toggleClass('menu-opened');
    //     $('.mobile-menu .main-nav').slideToggle(300);
    // });

    /**
     *  Select2
     *  -------
     * */
    // $('.select').select2({
    //     "width": "100%",
    //     minimumResultsForSearch: Infinity,
    // });

    /**
     *  Sticky Header
     *  -------------
     * */
    // if ($(window).width() < 768) {
    //     $(window).scroll(function () {
    //         let top = $(document).scrollTop();
    //         if (top < 1) $("html").removeClass('sticky-header');
    //         else $("html").addClass('sticky-header');
    //     });
    // } else {
    //     $(window).scroll(function () {
    //         let top = $(document).scrollTop();
    //         if (top < 1) $("html").removeClass('sticky-header');
    //         else $("html").addClass('sticky-header');
    //     });
    // }

    /**
     *  Rellax Scroll
     *  ------------
     * */
    // function rellax_scroll(link, point) {
    //     $(link).on('click', function (e) {
    //         $('html,body').stop().animate({scrollTop: $(point).offset().top}, 1250);
    //         e.preventDefault();
    //     });
    // }
    //
    // rellax_scroll('.back_to_top', '#top');

    /**
     *  Slick Slider
     *  ------------
     * */
    // $('.slider').slick({
    //     infinite: true,
    //     arrows: true,
    //     dots: false,
    //     slidesToShow: 1,
    //     autoplay: true,
    //     speed: 1000,
    //     autoplaySpeed: 5000,
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 arrows: false,
    //             }
    //         },
    //         {
    //             breakpoint: 550,
    //             settings: {
    //                 arrows: false,
    //             }
    //         }
    //     ]
    // });

    $(document).ready(function () {
        setEqualHeight($(".div"));
    });

});

function setEqualHeight(columns) {
    let tallestcolumn = 0;
    columns.each(
        function () {
            currentHeight = $(this).height();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.height(tallestcolumn);
}