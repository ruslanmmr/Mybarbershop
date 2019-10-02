$(document).ready(function () {
  lazy();
  tooltip();
  nav();
  slider();
  gallery();
  showNum();
  share();
  popup();
  autoHeight();
  check();
  fadeInWindows();
  scrollbar();
  searchCity()
});

$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  gallery();
  autoHeight();
  $('img').each(function() {
    //imagesResize($(this))
  });
});

//global variables
let innerWidth = $('.wrapper').width(),
    $slider = $('.slider'),
    $scroll = $('.scroll-area');

function scrollbar() {
  $('.scroll-area').niceScroll({
    cursorcolor: "#fff",
    cursorwidth: "5px",
    cursorborder: "0",
    cursorborderradius: "0",
    zindex: [100],
    bouncescroll: false,
    autohidemode: false
  });
}

//поиск
function searchCity() {
  let $input = $('#windowCity').find('.input'),
      $resaultItem = $('#windowCity').find('.popup-window__item'),
      $container = $('#windowCity').find('.popup-window__list'),
      $message = document.createElement('li');

  $message.className = 'popup-window__item';
  $message.innerHTML = '<span>Совпадений не найдено!</span>';

  //события
  $input.on('input', function() {
    let inputVal = $input.val().toLowerCase();

    if(inputVal.length >= 1) {
      $resaultItem.hide();
      let count = 0;
      $resaultItem.each(function() {
        let itemVal = $(this).find('a').text().toLowerCase();
        if(itemVal.search(inputVal) !== -1) {
          count++;
          $(this).show();
        }
      })
      if(count==0) {
        $container.append($message);
      } else {
        $message.remove();
      }
    } 
    else {
      $message.remove();
      $resaultItem.show();
    }
    $scroll.getNiceScroll().resize();
  });
}

//всплывающие окна
function fadeInWindows() {
  let posY,
      posX;
  
  let $window = {
    old: {
      el: undefined,
      hide: function(){
        $(this.el).fadeOut(200);
        $(this.el).removeClass('active');
        $btn.el.removeClass('active');
      }
    },
    current: {
      el: undefined,
      hide: function() {
        $(this.el).fadeOut(200);
        $(this.el).removeClass('active');
        $btn.el.removeClass('active');
      },
      show: function() {
        $(this.el).fadeIn(200);
        $(this.el).addClass('active');
        $btn.current.el.addClass('active');
        $scroll.getNiceScroll().resize();
        $window.old.el = $window.current.el;
      }
    }
  };
  let $btn = {
    className: 'windowOpenButton',
    el: $('.windowOpenButton'),
    current: {
      el: undefined
    }
  }

  $(document).on('click touchstart mousedown touchend', function(event) {

    //function
    if($(event.target).closest($btn.el).length > 0) {
      if(event.type=='click') {
        event.preventDefault();
        $btn.current.el = $(event.target).closest($btn.el);
        $window.current.el = $($btn.current.el.attr('href'));

        if(innerWidth>1024) { 
          posY = $btn.current.el.offset().top + $btn.current.el.height() + 2;
          posX = innerWidth - ($btn.current.el.offset().left + $btn.current.el.width()) + 4;
        } else {
          posY = $('.header').height();
          posX = 0;
        }

        $window.current.el.css({'top':posY, 'right':posX});

        if($window.current.el.hasClass('active')) {
          $window.current.hide();
        } else {
          if($window.old.el!==undefined && $window.old.el.hasClass('active')) {
            $window.old.hide();
          }
          $window.current.show();
        }
      } 
    } 
    else if($window.current.el!==undefined && $window.current.el.hasClass('active') && $(event.target).closest($window.current.el).length == 0) {
      $window.current.hide();
    }
  })
}


//nav
function nav() {
  var $navToggle = $('.sub-nav__nav-open, .nav__close'),
    $overlay = $('.overlay'),
    $nav = $('.nav');

  $navToggle.on('click', function (event) {
    event.preventDefault();
    $nav.toggleClass('active');
    navState();
  })
  
  $overlay.on('click touchstart', function () {
    $nav.removeClass('active');
    navState();
  })

  function navState() {
    if ($nav.hasClass('active')) {
      $overlay.fadeIn(300);
      scrollLock.hide($("body"));
      $('.page').addClass('page_fixed');
    } else {
      $overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('.page').removeClass('page_fixed');
    }
  }

  $(window).resize(function () {
    if (innerWidth > 1024) {
      $nav.removeClass('active');
      navState();
    }
  });

  /* navLink.on('click', function () {
    if (innerWidth < 993) {
      $nav.removeClass('nav_active');
      navState();
    }
  }) */

  /* //якорные ссылки
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
  }) */
}

function lazy() {
  $(".lazy").Lazy({
    effectTime: 0,
    threshold: 500,
    imageBase: false,
    defaultImage: false,
    afterLoad: function(element) {
      imagesResize(element);
    }
  });
}
function imagesResize(element) {
  let box = element.parent();

  if(!box.hasClass('cover-box_size-auto')) {
    let boxH = box.height(),
        boxW = box.width();

    setTimeout(function() {
      let imgH = element.height(),
          imgW = element.width();

      if ((boxW / boxH) >= (imgW / imgH)) {
        element.addClass('ww').removeClass('wh');
      } else {
        element.addClass('wh').removeClass('ww');
      }
      element.addClass('visible');
    }, 100)
  } else {
    element.addClass('visible');
  }
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
    $(this).on('init beforeChange afterChange', function(){
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

//check
function check() {
  var $checkbox = $('.label');

  $checkbox.on('click', function() {
    if($(this).children('input').prop('checked')) {
      $(this).addClass('checked');
    } else {
      $(this).removeClass('checked');
    }
  })
}