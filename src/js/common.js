$(document).ready(function () {
  lazy();
  tooltip();
  nav();
  cityBlock();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
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
      scrollInit();
      list.getNiceScroll().resize();
    } else {
      openbutton.removeClass('mobile-button_active');
      cityBlock.fadeOut(300);
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

//nav
function nav() {
  var navButton = $('.sub-nav__nav-open, .nav__close, .overlay'),
    nav = $('.nav'),
    navLink = $('.nav__link'),
    overlay = $('.overlay');

  navButton.click(function (event) {
    event.preventDefault();
    nav.toggleClass('nav_active');
    navState();
  })
  
  function navState() {
    if (nav.hasClass('nav_active')) {
      overlay.fadeIn(300);
      scrollLock.hide($("body"));
      $('body').addClass('body_fixed');
    } else {
      overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('body').removeClass('body_fixed');
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
    animationDuration: 200,
    trackerInterval: 300,
    triggerOpen: {
      click: true,  // For mouse
      tap: true, // For touch device
      mouseenter: true    // For touch device
    },
    triggerClose: {
      click: true,  // For mouse
      tap: true, // For touch device
      touchmove: true, // For touch device
      mouseleave: true // For mouse
    }
  });
}