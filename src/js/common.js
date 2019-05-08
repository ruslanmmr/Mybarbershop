$(document).ready(function () {
  lazy();
  tooltip();
  nav();
  cityBlock();
  slider();
  gallery();
  cover();
  showNum();
  share();
  popup();
  autoHeight();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  gallery();
  cover();
  autoHeight();
});

//global variables
var innerWidth = $('body').innerWidth(),
    $slider = $('.slider'),
  //scroll-styling
  cursorcolorVar = "#fff",
  cursorwidthVar = "7px",
  cursorborderVar = "0",
  cursorborderradiusVar = "0",
  zindexVar = [100],
  bouncescrollVar = false;
//

//city-block
function cityBlock() {
  var openbutton = $(".sub-nav__link_city"),
    textInput = $('.search-city__input'),
    list = $('.search-city__list'),
    cityBlock = $(".search-city"),
    scrollStart = $("html, body").scrollTop(),
    scrollEnd = $("html, body").scrollTop(),
    item = $(".search-city__item_city"),
    falseText = $(".search-city__item_nothing"),
    inputVal,
    value,
    quantity,
    state,
    flag;

  //события
  textInput.keyup(function () {
    searchCity();
  });

  $(document).on('click touchstart', function (e) {
    if (!flag) {
      flag = true;
      setTimeout(function () {
        flag = false;
      }, 300);
      if (!cityBlock.is(e.target) && cityBlock.has(e.target).length === 0 && cityBlock.hasClass("search-city_visible")) {
        toggleModal();
      } else if (openbutton.is(e.target) || openbutton.children().is(e.target)) {
        toggleModal();
      }
    }
  });

  $(window).scroll(function () {
    scrollEnd = $("html, body").scrollTop();
    if (((scrollEnd > (scrollStart + 100)) || ((scrollEnd < (scrollStart - 100)))) && state == true) {
      toggleModal();
    }
  });

  //функции
  function scrollInit() {
    list.niceScroll({
      cursorcolor: cursorcolorVar,
      cursorwidth: cursorwidthVar,
      cursorborder: cursorborderVar,
      cursorborderradius: cursorborderradiusVar,
      zindex: zindexVar,
      bouncescroll: bouncescrollVar,
      autohidemode: false
    });
  };

  //открытие или закрытие модалки
  function toggleModal() {
    scrollStart = $("html, body").scrollTop();
    cityBlock.toggleClass("search-city_visible");
    if (cityBlock.hasClass("search-city_visible")) {
      openbutton.addClass('mobile-button_active');
      textInput.val("");
      searchCity();
      cityBlock.fadeIn(300);
      state = true;
      scrollInit();
      list.getNiceScroll().resize();
    } else {
      openbutton.removeClass('mobile-button_active');
      cityBlock.fadeOut(300);
      state = false;
    }
  };

  //поиск
  function searchCity() {
    inputVal = textInput.val().toLowerCase();
    if (inputVal.length >= 1) {
      item.removeClass("search-city__item_active");
      item.each(function () {
        value = $(this).attr('data-city').toLowerCase();
        if (value.search(inputVal) != -1) {
          $(this).addClass('search-city__item_active');
        }
      })
      quantity = $(".search-city__item_city.search-city__item_active").length;
      if (quantity < 1) {
        falseText.addClass("search-city__item_active");
      } else {
        falseText.removeClass("search-city__item_active");
      }
    } else {
      item.addClass("search-city__item_active");
      falseText.removeClass("search-city__item_active");
    }
    list.getNiceScroll().resize();
  };
}
//image-cover-box
function cover() {
  $('.cover-box').each(function () {
    //set size
    var th = $(this).height(), //box height
      tw = $(this).width(), //box width
      im = $(this).children('img'), //image
      ih = im.height(),
      iw = im.width();
    if ((tw / th) >= (iw / ih)) {
      im.addClass('ww').removeClass('wh');
    } else {
      im.addClass('wh').removeClass('ww');
    }
  });
}

//nav
function nav() {
  var $navToggle = $('.sub-nav__nav-open, .nav__close'),
    $overlay = $('.overlay'),
    $nav = $('.nav'),
    navLink = $('.nav__link'),
    overlay = $('.overlay'),
    scrollLink = $('.scroll-link');

    $navToggle.on('click', function (event) {
    event.preventDefault();
    $nav.toggleClass('nav_active');
    navState();
    })
    $overlay.on('click touchstart', function () {
      $nav.removeClass('nav_active');
      navState();
    })

  function navState() {
    if ($nav.hasClass('nav_active')) {
      overlay.fadeIn(300);
      scrollLock.hide($("body"));
      $('.page').addClass('page_fixed');
    } else {
      overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('.page').removeClass('page_fixed');
    }
  }
  $(window).resize(function () {
    if (innerWidth > 992) {
      $nav.removeClass('nav_active');
      navState();
    }
  });
  navLink.on('click', function () {
    if (innerWidth < 993) {
      $nav.removeClass('nav_active');
      navState();
    }
  })

  //якорные ссылки
  scrollLink.click(function (event) {
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    event.preventDefault();

    if (innerWidth < 993) {
      $nav.removeClass('nav_active');
      navState();
      setTimeout(function () {
        $('body,html').animate({
          scrollTop: top
        }, 400);
      }, 300)
    } else {
      $('body,html').animate({
        scrollTop: top
      }, 400);
    }
  })
}
//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '1000',
    effect: 'fadeIn',
    effectTime: '300',
    defaultImage: false,
    afterLoad: function() {
      autoHeight();
      $slider.slick('setPosition');
      cover();
    }
  });
}
//tooltips
function tooltip() {
  $('.tooltip').tooltipster({
    theme: 'tooltipster-light',
    trigger: 'custom',
    animationDuration: 100,
    trackerInterval: 100,
    triggerOpen: {
      click: true, // For mouse
      touchstart: true, // For touch device
      mouseenter: true // For touch device
    },
    triggerClose: {
      click: true, // For mouse
      touchleave: true, // For touch device
      mouseleave: true // For mouse
    }
  });
}

function slider() {
  $slider.on('init', function () {
    $(this).addClass('slider_visible')
  });

  $slider.each(function () {
    $(this).on('init reInit afterChange', function(){
      lazy();
    });
    var slideCount = 1,
      slidesPerRow = 1,
      slideCount1200 = 1,
      slidesPerRow1200 = 1,
      slideCount992 = 1,
      slidesPerRow992 = 1,
      slideCount768 = 1,
      slidesPerRow768 = 1,
      slideCount576 = 1,
      slidesPerRow576 = 1,
      slideCount420 = 1,
      slidesPerRow420 = 1,
      rows = 1,
      arrows = false,
      dots = false,
      centerMode = false,
      adaptiveHeight = false;

    if ($(this).hasClass('slider_dots')) {
      dots = true;
    }
    if ($(this).hasClass('slider_arrows')) {
      arrows = true;
    }
    if ($(this).hasClass('recommendations-slider')) {
      slideCount = 6;
      slideCount1200 = 5;
      slideCount992 = 4;
      slideCount768 = 3;
      slideCount576 = 2;
      slideCount420 = 1;
    }
    if ($(this).hasClass('barbers__slider')) {
      slideCount = 4;
      slideCount1200 = 4;
      slideCount992 = 3;
      slideCount768 = 2;
      slideCount576 = 1;
      slideCount420 = 1;
    }
    if ($(this).hasClass('banner__slider')) {
      centerMode = true;
    }
    if ($(this).hasClass('portfolio__slider')) {
      slidesPerRow = 4;
      rows = 2;
      slidesPerRow1200 = 4;
      slidesPerRow992 = 3;
      slidesPerRow768 = 3;
      slidesPerRow576 = 2;
      slidesPerRow420 = 2;
    }
    if ($(this).hasClass('awards__slider')) {
      slideCount = 5;
      slideCount1200 = 5;
      slideCount992 = 4;
      slideCount768 = 3;
      slideCount576 = 2;
      slideCount420 = 2;
      adaptiveHeight = true;
    }

    if ($(this).hasClass('publications__slider')) {
      slidesPerRow = 2;
      rows = 2;
      slidesPerRow1200 = 2;
      slidesPerRow992 = 1;
      slidesPerRow768 = 1;
      slidesPerRow576 = 1;
      slidesPerRow420 = 1;
      adaptiveHeight = true;
    }

    $(this).slick({
      infinite: true,
      dots: dots,
      arrows: arrows,
      speed: 600,
      lazyLoad: 'ondemand',
      adaptiveHeight: adaptiveHeight,
      centerMode: centerMode,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      slidesPerRow: slidesPerRow,
      rows: rows,
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: slideCount1200,
            slidesToScroll: slideCount1200,
            slidesPerRow: slidesPerRow1200
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: slideCount992,
            slidesToScroll: slideCount992,
            slidesPerRow: slidesPerRow992
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: slideCount768,
            slidesToScroll: slideCount768,
            slidesPerRow: slidesPerRow768
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: slideCount576,
            slidesToScroll: slideCount576,
            slidesPerRow: slidesPerRow576
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: slideCount420,
            slidesToScroll: slideCount420,
            slidesPerRow: slidesPerRow420
          }
        }
      ]
    });
  });
  //fix
  $('.publications-slide').parent().css('display', 'flex');
}
//gallery
function gallery() {
  var row = $('.gallery__row:not(:first-child)'),
    block = $('.gallery-block'),
    title = $('.gallery-block_title'),
    margin;

  if (innerWidth > 576) {
    block.css('margin-top', '0');
    row.each(function () {
      margin = -($(this).height() / 2);
      $(this).css('margin-top', margin);
    })
  } else {
    row.css('margin-top', '0');
    block.each(function () {
      margin = -($(this).height() / 2);
      $(this).css('margin-top', margin);
    })
  }
}
//num
function showNum() {
  var num = '999-99-99',
    $toggleBtn = $('.number-block__show-btn');

  $toggleBtn.on('click', function () {
    $(this).parents('.number-block').find('span').text(num);
    $(this).remove();
  })
}

//share-trigger
function share() {
  var $shareTrigger = $('.share-trigger'),
    $shareBlock = $('.share-area'),
    $shareClose = $('.share-area__close'),
    $shareContent = $('.share-area__content'),
    $shareWrap = $('.share-area__wrap'),
    visible,
    interval,
    loaded = false;

  $shareTrigger.on('click', function (e) {
    e.preventDefault();
    shareOpen();
  })
  $(document).on('click touchstart', function (e) {
    if ($shareClose.is(e.target) || !$shareTrigger.is(e.target) && !$shareBlock.is(e.target) && $shareBlock.has(e.target).length === 0) {
      shareClose();
    }
  });


  function shareOpen() {
    $shareBlock.fadeIn(200);
    visible = true;
    pos();
    getSocials();
    resize();
  }

  function shareClose() {
    $shareBlock.fadeOut(200);
    visible = false;
    resize();
  }

  function pos() {
    var headerHeight = $('.header').height(),
      scroll = $(window).scrollTop();

    console.log(scroll, headerHeight)

    if (scroll < headerHeight) {
      $shareBlock.css({
        'position': 'absolute',
        'top': headerHeight
      });
    } else {
      $shareBlock.css({
        'position': 'fixed',
        'top': '0'
      });
    }
  }

  function resize() {
    if (visible == true) {
      interval = setInterval(function () {
        $shareContent.width($shareWrap.width());
        $shareContent.height($shareWrap.height());
      }, 50);
    } else {
      clearInterval(interval);
    }
  }

  function getSocials() {
    if (!loaded) {
      //vk
      $.getScript('https://vk.com/js/api/openapi.js?160', function () {
        VK.init({
          apiId: 6968173,
          onlyWidgets: true
        });
        VK.Widgets.Like("vk_like", {
          type: "mini",
          height: 30
        });
      });
      //fb
      $('body').prepend('<script async defer crossorigin="anonymous" src="https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v3.3"></script>');
      //ok
      ! function (d, id, did, st, title, description, image) {
        var js = d.createElement("script");
        js.src = "https://connect.ok.ru/connect.js";
        js.onload = js.onreadystatechange = function () {
          if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            if (!this.executed) {
              this.executed = true;
              setTimeout(function () {
                OK.CONNECT.insertShareWidget(id, did, st, title, description, image);
              }, 0);
            }
          }
        };
        d.documentElement.appendChild(js);
      }(document, "ok_shareWidget", document.URL, '{"sz":30,"st":"oval","ck":1}', "", "", "");
      loaded = true;
    }
  }


  $(window).on('scroll resize', function () {
    pos();
  });
}

//popup
function popup() {

  $(".popup-link").fancybox({
    autoFocus: false,
    loop: true
  });
  
  $(".modal-link").fancybox({
    autoFocus: false,
    smallBtn: true,
    touch: false
  });

  $('.gallery__item a').on('click', function() {
    var $selector = $(this).parents('.gallery').find('.slick-slide:not(.slick-cloned) a');

    $.fancybox.open( $selector, {
        selector : $selector,
        backFocus : false,
        loop: true,
        animationEffect: "fade"
    }, $selector.index( this ) );

    return false;
  });
  


  $('body').removeClass('compensate-for-scrollbar');
}

//корректировка высоты блоков
function autoHeight() {
  var $block = $('.js-auto-height__item');

  $block.css('height', 'auto');
  //корректировка высоты
  $block.parent().each(function() {
    var mh = 0;
    $(this).find($block).each(function () {
      var h_block = parseInt($(this).height());
      if(h_block > mh) {
         mh = h_block;
      };
    });
    $(this).find($block).height(mh);
  })
}