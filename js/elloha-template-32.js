$(document).ready(function () {
    // Mobile Nav
    var MobNav = $('.navbar-toggler');
    MobNav.on('click', function () {
        $('.menu-mobile').toggleClass('menu-mobile-active');
        $('.navbar-toggler .btn-menu').toggleClass('d-none');
    });

    // Sous-menu
    $('.clic-sub-menu').on('click', function () {
        if ($(this).children('.sub-menu').hasClass('sub-menu-active')) {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
        } else {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
            $(this).children('.sub-menu').addClass('sub-menu-active');
        }
    });

    // Sous-menu langues
    $('.languages').on('click', function () {
        if ($(this).children('.dropdown-menu').hasClass('dropdown-menu-active')) {
            $('.languages .dropdown-menu').removeClass('dropdown-menu-active');
        } else {
            $('.languages .dropdown-menu').removeClass('dropdown-menu-active');
            $(this).children('.dropdown-menu').addClass('dropdown-menu-active');
        }
    });

    // Texte presentation page Home
    if ($(".description").length > 0) {
        var $description = $(".description");
        var $seeMore2 = $("#seeMore2");
        var $seeLess2 = $("#seeLess2");

        // Check si le texte est limité, on affiche pas les boutons
        if ($description[0].scrollHeight <= $description.height()) {
            $seeMore2.hide();
            $seeLess2.hide();
        } else {
            $seeMore2.show();
            $seeLess2.hide();
        }

        // Voir plus presentation
        $seeMore2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').addClass("expanded");
            $seeMore2.hide();
            $seeLess2.show();
        });

        // Voir moins presentation
        $seeLess2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').removeClass("expanded");
            $seeMore2.show();
            $seeLess2.hide();
        });
    };

    // Voir plus SCEA
    $(".options-scea").hide();
    $(".options-scea").slice(0, 10).show();

    $("#seeMore1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea:hidden").slideDown();

        $("#seeMore1").hide();
        $("#seeLess1").show();
    });

    // Voir moins SCEA
    $("#seeLess1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea").not(":lt(10)").slideUp();

        $("#seeMore1").show();
        $("#seeLess1").hide();
    });

    // Descriptions des options home
    $('.options-slider').on('initialized.owl.carousel resized.owl.carousel', function (event) {
        $('.over-contain-presta').each(function () {
            var $this = $(this);
            var $description = $this.find('.description-option');
            var $seeMore = $this.find('.seeMore3');
            var $seeLess = $this.find('.seeLess3');

            // Vérifier si le texte est limité ou non pour afficher les boutons si besoin
            if ($description.text().trim().length > 0 && $description[0].scrollHeight > $description.height()) {
                $seeMore.show();
                $seeLess.hide();
            } else {
                $seeMore.hide();
                $seeLess.hide();
            }

            // Voir plus
            $seeMore.off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $description.addClass("is-expanded");
                $seeMore.hide();
                $seeLess.show();
            });

            // Voir moins
            $seeLess.off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $description.removeClass("is-expanded");
                $seeMore.show();
                $seeLess.hide();
            });
        });
    });

    // Réinitialisation des événements après le chargement du slider
    $(window).on('resize', function () {
        $('.options-slider').trigger('resized.owl.carousel');
    });

    // Pour chaque icône météo active, applique l'image de fond correspondante
    function updateWeatherBackground() {
        $('.owl-item.active .weather-icon').each(function () {
            var $meteoModule = $(this).closest('.meteo-module');
            var weatherIcon = $(this).attr('data');
            var baseUrl = $meteoModule.data('url');

            // Vérifie si weatherIcon est défini et non vide puis ajoute la photo en fonction de la data
            if (weatherIcon && weatherIcon.trim() !== '') {
                var iconPath = baseUrl + weatherIcon + '.jpg';
                
                $meteoModule.addClass('weather-' + weatherIcon);
                
                $meteoModule.css({
                    'background-image': 'url(' + iconPath + ')',
                    'background-size': 'cover'
                });
            } else {
                var defaultIconPath = baseUrl + 'clear-day.jpg';
                $meteoModule.css({
                    'background-image': 'url(' + defaultIconPath + ')',
                    'background-size': 'cover'
                });
            }
        });
    }

    // mise à jour après un léger délai, pour attendre le chargement
    setTimeout(function () {
        updateWeatherBackground();
    }, 50);

    // Mettre à jour l'image de fond lorsque le carrousel a terminé de changer de slide
    $('.slider-meteo').on('translated.owl.carousel', function () {
        updateWeatherBackground();
    });

    // Module météo ajouter temps qu'il fait
    $('.weather-trad').each(function () {
        var weatherTrad = $(this).attr('data');

        // Ajoute une classe basée sur l'icône météo
        $(this).closest('.weather-icon-contain').addClass('weather-' + weatherTrad);

        // Traduction de l'icône météo pour afficher dans le weather
        var weatherTranslation;
        switch (weatherTrad) {
            case 'clear-day':
                weatherTranslation = 'Clair';
                break;
            case 'Cloudy':
                weatherTranslation = 'Nuageux';
                break;
            case 'fog':
                weatherTranslation = 'Brouillard';
                break;
            case 'partly-cloudy-day':
                weatherTranslation = 'Mi-couvert';
                break;
            case 'rain':
                weatherTranslation = 'Pluie';
                break;
            case 'sleet':
                weatherTranslation = 'Verglas';
                break;
            case 'snow':
                weatherTranslation = 'Neige';
                break;
            case 'wind':
                weatherTranslation = 'Vent';
                break;
            default:
                weatherTranslation = 'Undefined';
                break;
        }

        // Affiche la traduction dans le div .weather-trad
        $(this).text(weatherTranslation);
    });

    // Descriptions des news home
    $('.news-slider').on('initialized.owl.carousel resized.owl.carousel', function (event) {
        // Pour chaque bloc de news
        $('.over-contain-presta-news').each(function () {
            var $this = $(this);
            var $description = $this.find('.description-news');
            var $seeMore = $this.find('.seeMore4');
            var $seeLess = $this.find('.seeLess4');

            // Vérifier si le texte est limité ou non pour afficher les boutons si besoin
            if ($description.text().trim().length > 0 && $description[0].scrollHeight > $description.height()) {
                $seeMore.show();
                $seeLess.hide();
            } else {
                $seeMore.hide();
                $seeLess.hide();
            }

            // Voir plus
            $seeMore.off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $description.addClass("is-expanded");
                $seeMore.hide();
                $seeLess.show();
            });

            // Voir moins
            $seeLess.off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $description.removeClass("is-expanded");
                $seeMore.show();
                $seeLess.hide();
            });
        });
    });

    // Réinitialisation des événements après le chargement du slider
    $(window).on('resize', function () {
        $('.news-slider').trigger('resized.owl.carousel');
    });

    // Texte description page page
    $('.title-and-descrip-page').each(function () {
        var $this = $(this);
        var $description = $this.find('.description');
        var $seeMore = $this.find('.seeMore5');
        var $seeLess = $this.find('.seeLess5');

        // Vérifier si le texte est limité ou non pour afficher les boutons si besoin
        if ($description[0].scrollHeight > $description.height()) {
            $seeMore.show();
            $seeLess.hide();
            $description.addClass("height-more");
        } else {
            $seeMore.hide();
            $seeLess.hide();
            $description.removeClass("height-more");
        }

        // Voir plus
        $seeMore.off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $description.addClass("is-expanded");
            $seeMore.hide();
            $seeLess.show();
        });

        // Voir moins
        $seeLess.off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $description.removeClass("is-expanded");
            $seeMore.show();
            $seeLess.hide();
        });
    });

    // Texte presentation page Détail/Offer
    if ($(".description").length > 0) {
        var $description = $(".description");
        var $seeMore6 = $("#seeMore6");
        var $seeLess6 = $("#seeLess6");

        // Check si le texte est limité, on affiche pas les boutons
        if ($description[0].scrollHeight <= $description.height()) {
            $seeMore6.hide();
            $seeLess6.hide();
        } else {
            $seeMore6.show();
            $seeLess6.hide();
        }

        // Voir plus
        $seeMore6.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').addClass("expanded");
            $seeMore6.hide();
            $seeLess6.show();
        });

        // Voir moins
        $seeLess6.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').removeClass("expanded");
            $seeMore6.show();
            $seeLess6.hide();
        });
    };


    // Texte description page news
    $('.title-and-descrip-news').each(function () {
        var $this = $(this);
        var $description = $this.find('.description-news-page-news');
        var $seeMore = $this.find('.seeMore7');
        var $seeLess = $this.find('.seeLess7');

        // Vérifier si le texte est limité ou non pour afficher les boutons si besoin
        if ($description[0].scrollHeight > $description.height()) {
            $seeMore.show();
            $seeLess.hide();
            $description.addClass("height-more");
        } else {
            $seeMore.hide();
            $seeLess.hide();
            $description.removeClass("height-more");
        }

        // Voir plus
        $seeMore.off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $description.addClass("is-expanded");
            $seeMore.hide();
            $seeLess.show();
        });

        // Voir moins
        $seeLess.off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $description.removeClass("is-expanded");
            $seeMore.show();
            $seeLess.hide();
        });
    });

    // Clics sur les liens des prix chèques cadeaux
    $('.all-prices-vouchers a').on('click', function (event) {
        event.preventDefault();

        var targetId = $(this).attr('id');

        // Trouver l'élément correspondant dans le slider
        var targetElement = $(targetId);
        if (targetElement.length) {
            var index = $('.vouchers-slider').find('.owl-item').filter(function () {
                return $(this).find(targetId).length > 0;
            }).index();

            // Si un index valide est trouvé, déplacer le slider
            if (index !== -1) {
                $('.vouchers-slider').trigger('to.owl.carousel', [index, 600]);
            } else {
                console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
            }
        } else {
            console.error("Cible non trouvée pour :", targetId);
        }
    });

    // Détecter le changement dans Owl Carousel pour le .active
    $('.vouchers-slider').on('changed.owl.carousel', function (event) {
        var currentIndex = event.item.index;

        // Sélectionner l'élément actif dans le slider
        var activeSlide = $(event.target).find('.owl-item').eq(currentIndex).find('.over-contain-voucher');

        if (activeSlide.length) {
            var activeId = activeSlide.attr('id');
            console.log("Élément actif dans le slider :", activeId);

            $('.all-prices-vouchers a').removeClass('active');

            $('.all-prices-vouchers a[href="#' + activeId + '"]').addClass('active');

        }
    });
});

$(document).ready(function () {
    $('.home-slider_img').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,

            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
        }
    });
    $('.offers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.options-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        },
    });
    $('.special-offers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-meteo').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,

            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
        }
    });
    $('.avis-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.news-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        },
    });
    $('.slider-page-page').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
        }
    });
    $('.detail-slider_img').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,

            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
        }
    });
    $('.other-offers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-page-news').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
        }
    });
    $('.vouchers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 20,
        items: 1,
        autoHeight: true,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,

            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
});