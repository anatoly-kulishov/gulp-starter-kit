jQuery(document).ready(function ($) {
    "use strict";

    /**
     *  Base Script
     *  -----------
     * */
    $('html').removeClass('no-js');

    /**
     *  One Page Scroll
     *  ---------------
     * */
    // $("main").onepage_scroll({
    //     sectionContainer: "section", // контейнер, к которому будет применяться скролл
    //     easing: "ease", // Тип анимации "ease", "linear", "ease-in", "ease-out", "ease-in-out"
    //     animationTime: 1000, // время анимации
    //     pagination: true, // скрыть или отобразить пагинатор
    //     updateURL: false // обновлять URL или нет
    // });


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

    /**
     *  Homemade Slider
     *  ---------------
     * */
    // function changePicture() {
    //     let image1 = $('.image-1');
    //     let image2 = $('.image-2');
    //     let image3 = $('.image-3');
    //     image1.removeClass('image-1').addClass('image-2');
    //     image2.removeClass('image-2').addClass('image-3');
    //     image3.removeClass('image-3').addClass('image-1');
    // }
    //
    // let timer;
    // const refreshIntervalId = setInterval(changePicture, 4000);
    //
    // $('.image').click(function () {
    //     changePicture();
    //
    //     clearInterval(refreshIntervalId);
    //
    //     if (!timer) {
    //         timer = setInterval(changePicture, 4000);
    //     } else {
    //         timer = clearInterval(timer);
    //     }
    //
    // })
    // 
   
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