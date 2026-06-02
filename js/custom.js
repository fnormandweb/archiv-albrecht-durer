/* ---------------------------------------------------

[ Custom settings ]

1. ScrollIt
2. Preloader
3. Navbar scrolling background 
4. Close navbar-collapse when a  clicked 
5. Sections background image from data background 
6. Animations
7. YouTubePopUp
8. Text Animation
9. Slider & Slider Fade OwlCarousel
10. Slider owlCarousel
11. Slider Fade owlCarousel
12. Testimonials owlCarousel
13. Testimonials 2 owlCarousel
14. Blog owlCarousel 
15. Team owlCarousel 
16. Portfolio owlCarousel
17. Portfolio 2 owlCarousel
18. Portfolio 3 owlCarousel
19. Portfolio 4 owlCarousel
20. Services owlCarousel
21. Services 2 owlCarousel
22. Home-Carousel owlCarousel
23. Image Gallery Scroll owlCarousel
24. Isotope Active Masonry Gallery
25. MagnificPopup Gallery
26. Smooth Scrolling
27. Scroll back to top
28. Accordion Box (for Faqs)
29. Rolling text
30. Magnet Cursor
31. Mouse Cursor
32. Buttons

--------------------------------------------------- */
$(function () {
    "use strict";
    var wind = $(window);
    var SITE_LOGO = $('body').data('site-logo') || 'img/logo_Albrecht_Durer.svg';

    function applySiteLogo() {
        $('.navbar .logo img, .footer .top .item .logo img').attr('src', SITE_LOGO);
    }
    applySiteLogo();
    
    // ScrollIt
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // animation duration
        activeClass: 'active', // class for active nav item
        onPageChange: null,
        topOffset: -100 // offset for fixed header
    });
    
    // ScrollIt Menu click for onepage
    $('a[data-scroll-nav]').on('click', function (e) {
        var href = $(this).attr('href');
        if (href && href !== "#" && href !== "javascript:void(0)") {
            return;
        }
        e.preventDefault();
        var target = parseInt($(this).attr('data-scroll-nav'), 10);
        var targetSection = $('[data-scroll-index="' + target + '"]');
        if (targetSection.length) {
            $('html, body').animate({
                scrollTop: targetSection.offset().top - 100
            }, 600);
        }
        // Close mobile menu for onepage
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // Preloader
    var CustomApp = {
        init: function () {
            this.handlePreloader();
        },
        handlePreloader: function () {
            $("#preloader").fadeOut(500);
            $(".preloader-bg").delay(300).fadeOut(500);
        }
    };
    CustomApp.init();
    
    // Navbar scrolling background 
    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar");
        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
        } else {
            navbar.removeClass("nav-scroll");
        }
    });
    
    // Close navbar-collapse when a  clicked 
    $(document).on('click', '.navbar-nav .dropdown-item a', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    // Sections background image from data background 
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    contentWayPoint();
    
    // YouTubePopUp 
    $(document).on('click', 'a.vid', function (e) {
        e.preventDefault();
        $(this).YouTubePopUp();
    });
    
    // Text Animation - Smooth horizontal scroll effect
    function letterCarousel(parents, childSelector) {
        const easing = 0.1;
        function animate() {
            const scrollTop = $(document).scrollTop();
            const windowHeight = $(window).height();
            parents.forEach(parentSelector => {
                $(parentSelector).each(function () {
                    const $parent = $(this);
                    const $child = $parent.find(childSelector);
                    if ($parent.length === 0 || $child.length === 0) return;
                    const parentTop = $parent.offset().top;
                    if (parentTop <= scrollTop + windowHeight) {
                        const distance = scrollTop - parentTop + windowHeight;
                        const scroll = distance - 150;
                        let current = $parent.data('current') || 0;
                        const target = scroll * 0.3;
                        current += (target - current) * easing;
                        $child.css('transform', `translate3d(${current}px, 0, 0)`);
                        $parent.data('current', current);
                    }
                });
            });
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
    
    // Parent ve child selector
    letterCarousel(['.call', '.testimonials2'], '.ornava-text');
    
    // Slider & Slider Fade OwlCarousel 
    var owl = $('.header .owl-carousel');
    
    // Slider owlCarousel
    $('.slider .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 5000,
        nav: false,
        navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                dots: false,
                nav: false,
            },
            600: {
                dots: false,
                nav: false,
            },
            1000: {
                dots: false
            }
        }
    });
    
    // Slider Fade owlCarousel
    $('.slider-fade .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        nav: false,
        navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                dots: false,
                nav: false,
            },
            600: {
                dots: false,
                nav: false,
            },
            1000: {
                dots: false
            }
        }
    });
    owl.on('changed.owl.carousel', function (event) {
        var item = event.item.index - 2; // Position of the current item
        $('span.icon').removeClass('animated fadeInUp');
        $('h6').removeClass('animated fadeInUp');
        $('h5').removeClass('animated fadeInUp');
        $('h4').removeClass('animated fadeInUp');
        $('h3').removeClass('animated fadeInUp');
        $('h2').removeClass('animated fadeInUp');
        $('h1').removeClass('animated fadeInUp');
        $('p').removeClass('animated fadeInUp');
        $('.durubtn').removeClass('animated fadeInUp');
        $('.durubtn2').removeClass('animated fadeInUp');
        $('.durubtn3').removeClass('animated fadeInUp');
        $('.durubtn4').removeClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('span.icon').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h6').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h5').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h3').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h2').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn2').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn3').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn4').addClass('animated fadeInUp');
    });
    
    // Testimonials 1 owlCarousel
    $('.testimonials1 .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='fa-light fa-angle-left'></span>", "<span class='lnr fa-light fa-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            }
        }
    });
    
    // Testimonials 2 owlCarousel
    $('.testimonials2 .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='fa-light fa-angle-left'></span>", "<span class='lnr fa-light fa-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    });
    
    //  Blog owlCarousel 
    $('.blog .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        dots: false,
        autoplayHoverPause: true,
        nav: false,
        navText: ["<span class='lnr fa-light fa-angle-left'></span>", "<span class='lnr fa-light fa-angle-right'></span>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Team owlCarousel 
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    
    // Portfolio owlCarousel
    $('.portfolio .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Portfolio 2 owlCarousel
    $('.portfolio2 .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Portfolio 3 owlCarousel
    $('.portfolio3 .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            }
        }
    });
    
    // Portfolio 4 owlCarousel
    $('.portfolio4 .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Services owlCarousel
    $('.services .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Services 2 owlCarousel
    $('.services2 .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Home-Carousel owlCarousel
    $('.home-carousel .owl-carousel').owlCarousel({
        autoWidth: true,
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        autoplayHoverPause: true,
        responsiveClass: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    })
    
    // Title animated
    $('.home-carousel .owl-carousel').on('changed.owl.carousel', function (event) {
        $('.home-carousel .item .inner').removeClass('animated');
        var currentIndex = event.item.index;
        var activeItem = $(event.target).find('.owl-item').eq(currentIndex).find('.inner');
        activeItem.addClass('animated');
    });
    $(function () {
        $('.home-carousel .owl-item.center .item .inner').addClass('animated');
    });
    
    // Image Gallery Scroll owlCarousel
    $('.galleryscroll .owl-carousel').owlCarousel({
        stagePadding: 0,
        autoWidth: true,
        loop: true,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 4000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='fa-light fa-angle-left'></span>", "<span class='fa-light fa-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        stagePadding: 0,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    });
    
    // Isotope Active Masonry Gallery
    $('.gallery-wrap').imagesLoaded(function () {
        $(document).on('click', '.gallery-filter li', function () {
            $(".gallery-filter li").removeClass("active");
            $(this).addClass("active");
            var selector = $(this).attr('data-filter');
            $(".gallery-wrap").isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        });
        $(".gallery-wrap").isotope({
            itemSelector: '.gallery-item, .items',
            layoutMode: 'masonry',
        });
    });
    
    // MagnificPopup Gallery
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    $(".img-zoom").magnificPopup({
        type: "image",
        closeOnContentClick: !0,
        mainClass: "mfp-fade",
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        }
    })
    $('.magnific-youtube, .magnific-vimeo, .magnific-custom').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
    });
    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
    });
    
    // Scroll back to top
    var progressPath = document.querySelector('.progress-wrap path');
    if (progressPath) { // null guard
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).on('scroll', updateProgress);
        var offset = 150;
        var duration = 550;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    }
    
    // Accordion Box (for Faqs)
    if ($(".accordion-box").length) {
        $(document).on("click", ".accordion-box .acc-btn", function () {
            var outerBox = $(this).closest(".accordion-box");
            var target = $(this).closest(".accordion");
            if ($(this).next(".acc-content").is(":visible")) {
                $(this).removeClass("active");
                $(this).next(".acc-content").slideUp(300);
                outerBox.children(".accordion").removeClass("active-block");
            } else {
                outerBox.find(".accordion .acc-btn").removeClass("active");
                $(this).addClass("active");
                outerBox.children(".accordion").removeClass("active-block");
                outerBox.find(".accordion").children(".acc-content").slideUp(300);
                target.addClass("active-block");
                $(this).next(".acc-content").slideDown(300);
            }
        });
    }
    
    // Magnific Popup Settings
    $(document).on('click', '.popup-img', function (e) {
        e.preventDefault();
        var src = $(this).attr('href') || $(this).data('src');
        var galleryName = $(this).data('gallery');
        var items;
        var galleryEnabled = false;
        if (galleryName) {
            items = $('.popup-img').filter('[data-gallery="' + galleryName + '"]').map(function () {
                return {
                    src: $(this).attr('href') || $(this).data('src')
                };
            }).get();
            galleryEnabled = true;
            var index = items.findIndex ? items.findIndex(function (it) {
                return it.src === src;
            }) : (function () {
                for (var i = 0; i < items.length; i++)
                    if (items[i].src === src) return i;
                return 0;
            })();
        } else {
            items = {
                src: src
            };
        }
        $.magnificPopup.open({
            items: items,
            type: 'image',
            gallery: {
                enabled: galleryEnabled
            },
            image: {
                markup: '\
        <div class="mfp-figure">\
          <div class="close-btn close-icon" role="button">&#215;</div>\
          <div class="mfp-img"></div>\
          <div class="close-btn close-bottom" role="button">閉じる</div>\
        </div>'
            },
            index: (typeof index !== 'undefined') ? index : 0,
            callbacks: {
                open: function () {
                    $(document).off('click.mfpClose', '.close-btn').on('click.mfpClose', '.close-btn', function () {
                        $.magnificPopup.close();
                    });
                },
                close: function () {
                    $(document).off('click.mfpClose', '.close-btn');
                }
            }
        });
    });
    
    // Rolling text
    $('.rolling-text').each(function () {
        const $el = $(this);
        const innerText = $el.text();
        $el.empty(); // içeriği temizle
        const $textContainer = $('<div>').addClass('block');
        for (const letter of innerText) {
            const $span = $('<span>').addClass('letter').text(letter.trim() === '' ? '\xa0' : letter);
            $textContainer.append($span);
        }
        $el.append($textContainer).append($textContainer.clone());
    });
    $(document).on('mouseenter', '.rolling-text', function () {
        $(this).removeClass('play');
    });
    
    // Magnet Cursor
    function magnetize(el, e) {
        const mX = e.pageX;
        const mY = e.pageY;
        const item = $(el);
        const customDist = item.data('dist') * 20 || 80;
        const centerX = item.offset().left + (item.width() / 2);
        const centerY = item.offset().top + (item.height() / 2);
        const deltaX = Math.floor(centerX - mX) * -0.35;
        const deltaY = Math.floor(centerY - mY) * -0.35;
        const distance = parseInt(calculateDistance(item, mX, mY), 10);
        if (distance < customDist) {
            TweenMax.to(item, 0.5, {
                y: deltaY,
                x: deltaX,
                scale: 1
            });
            item.addClass('magnet');
        } else {
            TweenMax.to(item, 0.6, {
                y: 0,
                x: 0,
                scale: 1
            });
            item.removeClass('magnet');
        }
    }
    function calculateDistance(elem, mouseX, mouseY) {
        return parseInt(Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) + Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2))), 10);
    }
    function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }
    
    // Mouse Cursor
    class Cursor {
        constructor() {
            this.cursor = document.querySelector('.js-cursor');
            this.mouseCurrent = {
                x: 0,
                y: 0
            };
            this.mouseLast = {
                x: 0,
                y: 0
            };
            this.rAF = null;
        ['getMousePosition', 'run'].forEach(fn => this[fn] = this[fn].bind(this));
        }
        getMousePosition(e) {
            this.mouseCurrent = {
                x: e.clientX,
                y: e.clientY
            };
        }
        run() {
            this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2);
            this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2);
            this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100;
            this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100;
            this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`;
            this.rAF = requestAnimationFrame(this.run);
        }
        requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run);
        }
        addEvents() {
            window.addEventListener('mousemove', this.getMousePosition, false);
        }
        on() {
            this.addEvents();
            this.requestAnimationFrame();
        }
        init() {
            this.on();
        }
    }
    if ($('.js-cursor').length > 0) {
        const cursor = new Cursor();
        cursor.init();
        const dragItems = '.slider-fade .owl-theme .item, .home-carousel .owl-theme .item, .portfolio .owl-theme .item, .portfolio2 .owl-theme .item, .portfolio3 .owl-theme .items, .portfolio4 .owl-theme .item, .services2 .owl-theme .item, .services .owl-theme .item, .testimonials1 .owl-theme .item, .team .owl-theme .item, .blog .owl-theme .item, .galleryscroll .owl-theme .item';
        $(dragItems).on('mouseenter', function () {
            $('.cursor').addClass('drag');
        }).on('mouseleave', function () {
            $('.cursor').removeClass('drag active');
        });
        $(dragItems).find('a').on('mouseenter', function () {
            $('.cursor').removeClass('drag active');
        }).on('mouseleave', function () {
            $('.cursor').addClass('drag');
        });
        $(document).on('mousedown', function () {
            if ($('.cursor').hasClass('drag')) {
                $('.cursor').addClass('active');
            }
        }).on('mouseup', function () {
            $('.cursor').removeClass('active');
        });
        $('a').on('mouseenter', function () {
            $('.cursor').addClass('link-hover');
        }).on('mouseleave', function () {
            $('.cursor').removeClass('link-hover');
        });
    }
    
    // Buttons
    $(document).on('click', '.durubtn, .durubtn2, .durubtn3, .durubtn4', function () {
        $(this).toggleClass('active');
    });
    
    
    // Slider Grid Background
    var imageElements = document.querySelectorAll('.grid-img');
    var itemElements = document.querySelectorAll('.grid-con');
    function isMobile() {return window.innerWidth < 768;}
    if (itemElements.length) {
        itemElements.forEach(function (item, index) {
            item.addEventListener('mouseenter', function () {
                if (!isMobile()) {
                    imageElements.forEach(function (image) {
                        image.classList.remove('grid-img-active');
                    });
                    itemElements.forEach(function (card) {
                        card.classList.remove('grid-con-active');
                    });
                    item.classList.add('grid-con-active');
                    imageElements[index].classList.add('grid-img-active');
                }
            });
            item.addEventListener('mouseleave', function () {
                if (!isMobile()) {
                    imageElements.forEach(function (image) {
                        image.classList.remove('grid-img-active');
                    });
                    itemElements.forEach(function (card) {
                        card.classList.remove('grid-con-active');
                    });
                    itemElements[0].classList.add('grid-con-active');
                    imageElements[0].classList.add('grid-img-active');
                }
            });
        });
    }
    var $slider = $('.slider-grid-bg .owl-carousel');
    $slider.owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>","<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive: {
            0: { 
                items: 1, 
            },
            600: { 
                items: 2,
            },
            1000: { 
                items: 3,
            }
        }
    });
    $slider.on('changed.owl.carousel', function(event) {
        var totalItems = imageElements.length;
        var currentIndex = event.item.index - event.relatedTarget._clones.length / 2;
        if(currentIndex < 0) currentIndex = totalItems + currentIndex;
        var realIndex = currentIndex % totalItems;
        imageElements.forEach(function (image) {
            image.classList.remove('grid-img-active');
        });
        imageElements[realIndex].classList.add('grid-img-active');
        if (!isMobile()) {
            itemElements.forEach(function (card) {
                card.classList.remove('grid-con-active');
            });
            itemElements[realIndex].classList.add('grid-con-active');
        } else { itemElements.forEach(function (card, idx) {
                var title = card.querySelector('.title');
                if(title) title.style.color = (idx === realIndex ? '#fff' : ''); 
            });}
    });
    imageElements[0].classList.add('grid-img-active');
    if (!isMobile()) {itemElements[0].classList.add('grid-con-active');} else {
        itemElements.forEach(function (card, idx) {
            var title = card.querySelector('.title');
            if(title) title.style.color = (idx === 0 ? '#fff' : '');
        });
    }
    
    
});
