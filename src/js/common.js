$(document).ready(function () {
  lazy();
  tooltip();
  nav();
  slider();
  gallery();
  showNum();
  share();
  autoHeight();
  checkbox();
  checkboxCheck();
  fadeInWindows();
  scrollbar();
  funcybox();
  toggleblocks();
  tabs();
  textMoreToggle();
  select();
  if($('.date-slider').length>0) {
    $dateSlider.init();
  }
  picker.init();
  audio.init();
});

$(window).resize(function () {
  windowW = Math.max(window.innerWidth, document.documentElement.clientWidth);
  pageW = Math.min(window.innerWidth, document.documentElement.clientWidth);

  gallery();
  autoHeight();

  $('img').each(function() {
    imagesResize($(this))
  });
});


//global variables
let windowW = Math.max(window.innerWidth, document.documentElement.clientWidth),
    pageW = Math.min(window.innerWidth, document.documentElement.clientWidth),
    scrollbarW = windowW - pageW,
    $checkbox,
    $slider = $('.slider:visible'),
    $scroll = $('.scroll-area');

function scrollbar() {
  $scroll.niceScroll({
    cursorcolor: "#fff",
    cursorwidth: "5px",
    cursorborder: "0",
    cursorborderradius: "0",
    zindex: [100],
    bouncescroll: false,
    autohidemode: false
  });
  setInterval(function() {
    $scroll.getNiceScroll().resize();
  }, 100)
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

        if(windowW>1024) { 
          posY = ($btn.current.el.offset().top + $btn.current.el.height() + 2) - $('.header').offset().top;
          posX = pageW - ($btn.current.el.offset().left + $btn.current.el.width()) + 4;
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

//text descriptions
function textMoreToggle() {
  let element = $('.text-container');

  element.each(function() {
    let $container = $(this).find('.text-parent'),
      $content = $(this).find('.text-content'),
      $btn = $(this).find('.js-text-more'),
      showText = $btn.find('.link').data('show-text'),
      hideText = $btn.find('.link').data('hide-text'),
      maxh = $container.height(),
      hc;

    function check() {
      hc = $content.height();
      if(hc>maxh) {
        $btn.show();
      } else {
        $btn.hide();
      }
      if($container.hasClass('active')) {
        $(this).css('max-height', hc)
      }
    }
    check();
    $(window).resize(function () {
      check();
    });
    $btn.find('.link').on('click', function(event) {
      event.preventDefault();
      toggleNav()
    })
    function toggleNav() {
      if(!$container.hasClass('active')) {
        $container.addClass('active');
        $container.css('max-height', hc);
        $btn.find('.link').addClass('active');
        $btn.find('.link').text(hideText);
      } else {
        $container.removeClass('active');
        $container.css('max-height', maxh);
        $btn.find('.link').removeClass('active');
        $btn.find('.link').text(showText);
      }
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
      $('.page').addClass('active');
    } else {
      $overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('.page').removeClass('active');
    }
  }

  $(window).resize(function () {
    if (windowW > 1024) {
      $nav.removeClass('active');
      navState();
    }
  });
}

function lazy() {
  $(".lazy").Lazy({
    effectTime: 0,
    threshold: 0,
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
    delay: 0,
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
      slideCount1200 = 1,
      slideCount1024 = 1,
      slideCount768 = 1,
      slideCount576 = 1,
      slideCount420 = 1,
      arrows = false,
      dots = false,
      centerMode = false,
      adaptiveHeight = false,
      autoplay = false;

    if ($(this).hasClass('slider_dots')) {
      dots = true;
    }
    if ($(this).hasClass('slider_arrows')) {
      arrows = true;
    }
    if ($(this).hasClass('recommendations-slider')) {
      slideCount = 6;
      slideCount1200 = 5;
      slideCount1024 = 4;
      slideCount768 = 3;
      slideCount576 = 2;
      slideCount420 = 1;
    }
    if ($(this).hasClass('barbers-slider') || $(this).hasClass('portfolio-slider') || $(this).hasClass('barbershops-slider') ) {
      slideCount = 4;
      slideCount1200 = 4;
      slideCount1024 = 3;
      slideCount768 = 2;
      slideCount576 = 1;
      slideCount420 = 1;
    }
    if($(this).hasClass('js-autoslide')) {
      autoplay = true;
    }
    if ($(this).is('.banner_type1 .banner__slider')) {
      centerMode = true;
    }
    if ($(this).is('.banner_type2 .banner__slider')) {
      slideCount = 2;
      slideCount1200 = 2;
      slideCount1024 = 2;
      slideCount768 = 2;
      slideCount576 = 1;
      slideCount420 = 1;
    }
    if ($(this).hasClass('awards-slider')) {
      slideCount = 5;
      slideCount1200 = 5;
      slideCount1024 = 4;
      slideCount768 = 3;
      slideCount576 = 2;
      slideCount420 = 2;
      adaptiveHeight = true;
    }
    //sliders
    if($(this).hasClass('baraholka-slider')) {
      let slider = $(this);

      if(!slider.hasClass('slick-initialized')) {
        let navitem = slider.parents('.baraholka-item').find('.baraholka-slider-nav__item a'),
            slideIndex;

        slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
          slideIndex = currentSlide;
          pag();
        });
    
        navitem.on('click', function(event) {
          event.preventDefault();
          slideIndex = $(this).parent().index();
          slider.slick('slickGoTo', slideIndex);
          pag();
        });
    
        //custom pagination
        function pag() {
          navitem.removeClass('active');
          navitem.parent().eq(slideIndex).find(navitem).addClass('active');
        }

      }
    }

    $(this).slick({
      infinite: true,
      dots: dots,
      arrows: arrows,
      speed: 600,
      adaptiveHeight: adaptiveHeight,
      centerMode: centerMode,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      autoplay: autoplay,
      autoplaySpeed: 6000,
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: slideCount1200,
            slidesToScroll: slideCount1200
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: slideCount1024,
            slidesToScroll: slideCount1024
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
  //fix
  $('.publications-slide').parent().css('display', 'flex');
}

//gallery
function gallery() {
  var row = $('.gallery__row:not(:first-child)'),
    block = $('.gallery-block'),
    title = $('.gallery-block_title'),
    margin;

  if (windowW > 576) {
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
  $(document).on('click', '.number-btn', function(event) {
    if(!$(this).hasClass('visible')) {
      event.preventDefault();
      let num = $(this).data('number');
      $(this).text(`Телефон: ${num}`).addClass('visible');
    }
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

function funcybox() {
  $.fancybox.defaults.btnTpl.close = '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.6 13.6"><path d="M6.8 5.4L1.4 0 0 1.4l5.4 5.4L0 12.2l1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4L12.2 0z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
  '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10.14"><path d="M6.28 8.77l-1.34 1.37L0 5.07 4.94 0l1.34 1.38L3.6 4.1H14v1.94H3.6z"></path></svg></div>' +
  "</button>";
  $.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_right" title="{{PREV}}">' +
  '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10.14"><path d="M10.4 6.04L7.72 8.76l1.34 1.38L14 5.07 9.06 0 7.72 1.38 10.4 4.1H0v1.94z"></path></svg></div>' +
  "</button>";
  $.fancybox.defaults.btnTpl.zoom = '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.056 14.096"> <path d="M13.756 12.356l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zm-10.6-3.5a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"></path> </svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.download = '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.24 14"> <path d="M13.24 12.09V14H0v-1.91zm-2.97-6.96l1.35 1.32-5 4.87-5-4.87 1.36-1.32 2.68 2.64V0h1.92v7.77z"></path> </svg>' +
  "</a>";
  $.fancybox.defaults.btnTpl.slideShow = '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13.2"> <path d="M0 0v13.2l11-6.6z"></path></svg>' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.35 12.5" id="slideshow"><path d="M0 0h2.2v12.5H0zm5.15 0h2.2v12.5h-2.2z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.smallBtn = '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.6 13.6"><path d="M6.8 5.4L1.4 0 0 1.4l5.4 5.4L0 12.2l1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4L12.2 0z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.thumbs = '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.7 12.7" id="slideshow"><path d="M8.94 8.94h3.76v3.76H8.94zm-4.47 0h3.76v3.76H4.47zM0 8.94h3.76v3.76H0zm8.94-4.47h3.76v3.76H8.94zm-4.47 0h3.76v3.76H4.47zM0 4.47h3.76v3.76H0zM8.94 0h3.76v3.76H8.94zM4.47 0h3.76v3.76H4.47zM0 0h3.76v3.76H0z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.i18n.ru = {
    CLOSE       : 'Закрыть',
    NEXT        : 'Следующий слайд',
    PREV        : 'Предидущий слайд',
    ERROR       : 'Ошибка загрузки, попробуйте позже.',
    PLAY_START  : 'Запустить слайд-шоу',
    PLAY_STOP   : 'Остановить слайд-шоу',
    FULL_SCREEN : 'Полноэкранный режим',
    THUMBS      : 'Миниатюры',
    DOWNLOAD    : 'Загрузить',
    SHARE       : 'Поделиться',
    ZOOM        : 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.animationEffect = 'fade'
  $.fancybox.defaults.backFocus = 'false'

  /* $(".popup-link").fancybox({
    autoFocus: false,
    loop: true
  }); */
  
  $(".modal-link").fancybox({
    autoFocus: false,
    smallBtn: true,
    touch: false
  });

  $('.slide [data-fancybox]').on('click', function() {
    let $selector = $(this).parents('.slider').find('.slick-slide:not(.slick-cloned) a');

    $.fancybox.open( $selector, {
        selector : $selector,
        backFocus : false
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

//обрабокта кликов
function checkbox() {
  $(document).on('click', '.checkbox', function() {
    checkboxCheck();
  })
}

//в остальных ситуация для изменения вида чекбоксов выполняется эта функция
function checkboxCheck() {
  $checkbox = $('.checkbox');

  $checkbox.each(function() {
    if($(this).find('input').prop('checked') || $('#' + $(this).attr('for')).prop('checked')) {
      $(this).addClass('checked');
      if($(this).hasClass('toggle-checkbox')) {
        $(this).parents('form').find('.toggle-item').addClass('active');
      }
    } else {
      $(this).removeClass('checked');
      if($(this).hasClass('toggle-checkbox')) {
        $(this).parents('form').find('.toggle-item').removeClass('active');
      }
    }
  })
  
  if($('.kate-check-block').length>0) {
    totalPrice()
    console.log('++')
  }
}


function totalPrice() {
  let totalVal = 0,
      $totalVal = $('.form__total-price span'),
      $item = $('.kate-check-block');

  $item.each(function() {
    if($(this).find('input').prop('checked') ) {
      totalVal = totalVal+(+$(this).find('input').data('price'));
    }
  })

  $totalVal.text(totalVal + ' р.');
  $('.total-price').val(totalVal + ' р.');
}

//toggle
function toggleblocks() {
  let $container = $('.toggle-group'),
      $btns,
      $content;

  $(document).on('click', '.toggle-button', function(event) {
    event.preventDefault();

    $container = $(this).closest('.toggle-group');
    $content = $container.find('.toggle-content').eq(0);
    $btns = $container.find('.toggle-button').not($content.find('.toggle-button'));


    if($container.hasClass('active')) {
      $container.removeClass('active');
      $content.removeClass('active');
      $btns.each(function() {
        $(this).removeClass('active');
        if($(this).data('show-text')!==undefined) {
          if($(this).find('span').length>0) {
            $(this).find('span').text($(this).data('show-text'))
          } else {
            $(this).text($(this).data('show-text'))
          }
        }
      })
    } else {
      $container.addClass('active');
      $content.addClass('active');
      $btns.each(function() {
        $(this).addClass('active');
        if($(this).data('hide-text')!==undefined) {
          if($(this).find('span').length>0) {
            $(this).find('span').text($(this).data('hide-text'))
            console.log('2')
          } else {
            $(this).text($(this).data('hide-text'))
          }  
        }
      })
    }


  })


}
//tabs
function tabs() {
  $('.tab-block__item a').eq(0).addClass('active');
  $('.tab-block__tab').not(':first').hide();

  $(document).on('click', '.tab-block__item a', function(event) {
    event.preventDefault();

    let order = $(this).parent().index(),
        $tabBlock = $(this).parents('.tab-block'),
        $btn = $tabBlock.find('.tab-block__item a')

    $btn.removeClass('active');
    $(this).addClass('active');
    $tabBlock.find('.tab-block__tab').hide()
    $tabBlock.find('.tab-block__tab').eq(order).fadeIn(200);
  })
}

//select
function select() {
  if ($('html').hasClass('desktop')) {
    $('.select select').niceSelect();
  } else {
    $('.select').addClass('mobile-select');
  }
  
}

let $dateSlider = {
  parent: $('.date-slider'),
  element: $('.date-slider__slider'),
  month: $('.date-slider__month'),
  loader: $('.date-slider-loader'),
  nextSlideControl: $('.date-slider__content .date-slider__next-m'),
  prevSlideControl: $('.date-slider__content .date-slider__prev-m'),
  nextMControl: $('.date-slider__head .date-slider__next-m'),
  prevMControl: $('.date-slider__head .date-slider__prev-m'),
  date: new Date(),
  inload: false,
  firstLoad: true,
  init: function() {
    this.slide = $('.date-slider-item');
    //this.slides = this.slide.length();
    this.element = $('.date-slider__slider');
    
    this.day = this.date.getDate();

    if(this.firstLoad==true) {
      this.firstLoad=false;
      //events
      this.nextMControl.on('click', function() {
        if($dateSlider.inload==false) {
          $dateSlider.changeMonth('next');
        }
      })
      this.prevMControl.on('click', function() {
        if($dateSlider.inload==false) {
          $dateSlider.changeMonth('prev');
        }
      })
      this.prevSlideControl.on('click', function() {
        if($('.slick-slide:first-child').hasClass('slick-active') && $dateSlider.inload == false) {
          $dateSlider.changeMonth('prev');
        } else {
          $dateSlider.element.slick('slickPrev')
        }
      })
      this.nextSlideControl.on('click', function() {
        if($('.slick-slide:last-child').hasClass('slick-active') && $dateSlider.inload == false) {
          $dateSlider.changeMonth('next');
        } else {
          $dateSlider.element.slick('slickNext')
        }
      })
      /* this.element.on('edge', function(event, slick, direction){
        if($dateSlider.inload == false) {
          if(direction=='right') {
            $dateSlider.changeMonth('prev');
          } else if(direction=='left' && $('.slick-slide:last-child').hasClass('slick-active')) {
            $dateSlider.changeMonth('next');
          }
        }
      }); */
    }
    //
    this.element.on('init', function(){
      $dateSlider.inload = false;
      $dateSlider.loader.removeClass('visible');
      $dateSlider.element.addClass('visible');
    });

    //$current = this.day > this.slides - slidesToShow ? this.day - (slidesToShow - 1) : this.day

    this.element.slick({
      infinite: false,
      dots: false,
      arrows: false,
      speed: 300,
      slidesToShow: 12,
      slidesToScroll: 5,
      touchThreshold: 10,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 10,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 8,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    })
    let slide = this.day,
        slides = this.slide.length;
    
        
    if(slide>slides-7 && windowW>1200) {
      slide = slides-6;
    } else if(slide>slides-7 && windowW>768) {
      slide = slides-5;
    }

    this.element.slick('slickGoTo',slide-1,true);

  },
  changeMonth: function(direction) {
    this.inload = true;
    $dateSlider.loader.addClass('visible');
    $dateSlider.element.removeClass('visible');
    setTimeout(() => {
      this.element.slick('unslick');
      this.slide.remove();
      if(direction=='next') {
        $dateSlider.parent.trigger('next');
      } else {
        $dateSlider.parent.trigger('prev');
      }
    }, 500)
  }
}

//date/time
let picker = {
  init: function() {
    let $date = $('.js-picker-date');

    flatpickr($date, {
      "locale": 'ru',
      disableMobile: "true",
      dateFormat: "d.m.Y",
      defaultDate: 'today'
    });
  }
}
//audio
let audio = {
  init: function() {
    audiojs.events.ready(function() {
      let audio = audiojs.createAll();
    });
  }
}
