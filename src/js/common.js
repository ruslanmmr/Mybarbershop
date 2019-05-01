$(document).ready(function () {
  lazy();
  tooltip();
  nav();
  cityBlock();
  slider();
  gallery();
  cover();
  modalMagnificBasket();
  showNum();
  share();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  gallery();
  cover();
});

//global variables
var innerWidth = $('body').innerWidth(),
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
  $('.cover-box').each(function() {
    //set size
    var th = $(this).height(),//box height
        tw = $(this).width(),//box width
        im = $(this).children('img'),//image
        ih = im.height(),
        iw = im.width();
    if ((tw/th) >= (iw/ih)) {
        im.addClass('ww').removeClass('wh');
    } else {
        im.addClass('wh').removeClass('ww');
    }
  });
}

//nav
function nav() {
  var navButton = $('.sub-nav__nav-open, .nav__close, .overlay'),
    nav = $('.nav'),
    navLink = $('.nav__link'),
    overlay = $('.overlay'),
    scrollLink = $('.scroll-link');

  navButton.click(function (event) {
    event.preventDefault();
    nav.toggleClass('nav_active');
    navState();
  })
  
  function navState() {
    if (nav.hasClass('nav_active')) {
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
      nav.removeClass('nav_active');
      navState();
    }
  });
  navLink.on('click', function () {
    if(innerWidth < 993) {
      nav.removeClass('nav_active');
      navState();
    }
  })

  //якорные ссылки
  scrollLink.click(function (event) {
    var id = $(this).attr('href'),
      top = $(id).offset().top;
      event.preventDefault();

    if(innerWidth < 993) {
      nav.removeClass('nav_active');
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
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}
//tooltips
function tooltip() {
  $('.tooltip').tooltipster({
    theme: 'tooltipster-light',
    trigger:'custom',
    animationDuration: 100,
    trackerInterval: 100,
    triggerOpen: {
      click: true,  // For mouse
      touchstart: true, // For touch device
      mouseenter: true    // For touch device
    },
    triggerClose: {
      click: true,  // For mouse
      touchleave: true, // For touch device
      mouseleave: true // For mouse
    }
  });
}
function slider() {
  var slider = $('.slider');

  slider.on('init', function () {
    $(this).addClass('slider_visible')
  });
  
  slider.each(function() {
    var slideCount = 1,
        slideCount1200 = 1,
        slideCount992 = 1,
        slideCount768 = 1,
        slideCount576 = 1,
        slideCount420 = 1,
        arrows = false,
        dots = false,
        centerMode = false;

    if($(this).hasClass('slider_dots')) {
      dots = true;
    }
    if($(this).hasClass('slider_arrows')) {
      arrows = true;
    }
    if($(this).hasClass('recommendations-slider')) {
      slideCount = 6;
      slideCount1200 = 5;
      slideCount992 = 4;
      slideCount768 = 3;
      slideCount576 = 2;
      slideCount420 = 1;
    }
    if($(this).hasClass('barbers__slider')) {
      slideCount = 4;
      slideCount1200 = 4;
      slideCount992 = 3;
      slideCount768 = 2;
      slideCount576 = 1;
      slideCount420 = 1;
    }
    if($(this).hasClass('banner__slider')) {
      centerMode = true;
    }

    $(this).slick({
      infinite: true,
      dots: dots,
      arrows: arrows,
      speed: 600,
      lazyLoad: 'progressive',
      centerMode: centerMode,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: slideCount1200,
            slidesToScroll: slideCount1200
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: slideCount992,
            slidesToScroll: slideCount992
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: slideCount768,
            slidesToScroll: slideCount768
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: slideCount576,
            slidesToScroll: slideCount576
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: slideCount420,
            slidesToScroll: slideCount420
          }
        }
      ]
    });
  });
}
//gallery
function gallery() {
  var row = $('.gallery__row:not(:first-child)'),
      block = $('.gallery-block'),
      title = $('.gallery-block_title'),
      margin;

  if(innerWidth>576) {
    block.css('margin-top', '0');
    row.each(function() {
        margin = -($(this).height() / 2);
        $(this).css('margin-top', margin);
    }) 
  } else {
    row.css('margin-top', '0');
    block.each(function() {
      margin = -($(this).height() / 2);
      $(this).css('margin-top', margin);
    })
  }
}
//popup
function modalMagnificBasket() {
  $('.popup_link').magnificPopup({
    closeBtnInside: false,
    showCloseBtn: false,
    fixedContentPos: true,
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });
  $('.popup-close').click(function() {
    $.magnificPopup.close();
});
}
//num
function showNum() {
  var num = '999-99-99',
      $toggleBtn = $('.number-block__show-btn');

      $toggleBtn.on('click', function() {
        $(this).parents('.number-block').find('span').text(num);
        $(this).remove();
      })
}

//share-trigger
function share() {
  var $shareTrigger = $('.share-trigger'),
      $shareBlock = $('.share-area'),
      $shareClose = $('.share-area__close');

  $shareTrigger.on('click', function(e) {
    e.preventDefault();
    $shareBlock.fadeIn(200);
    pos();
    getVk();
  })

  $shareClose.on('click', function(e) {
    e.preventDefault();
    $shareBlock.fadeOut(200);
  })

  function pos() {
    var headerHeight = $('.header').height(),
        scroll = $(window).scrollTop();
      
    console.log(scroll, headerHeight)

    if (scroll < headerHeight) {
      $shareBlock.css({'position': 'absolute', 'top': headerHeight});
    } else {
      $shareBlock.css({'position': 'fixed', 'top': '0'});
    }
  }

  function getVk() {
    $.getScript('https://vk.com/js/api/openapi.js?160', function() {
      //
      VK.init({apiId: 6968173, onlyWidgets: true});
      VK.Widgets.Like("vk_like", {type: "mini", height: 30});
    })
  }

  $(window).on('scroll resize', function () {
      pos();
  });
}