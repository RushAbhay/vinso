// Menu //
const menu = document.querySelector(".main-nav");
const btnMenu = document.querySelector(".main-nav__toggle");
const toggleMenu = function() {
  menu.classList.toggle('main-nav--opened');
  menu.classList.toggle('main-nav--closed');
}

menu.classList.remove("main-nav--nojs");

btnMenu.addEventListener('click', function(e) {
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener('click', function(e) {
  const target = e.target;
  const its_menu = target == menu || menu.contains(target);
  const its_btnMenu = target == btnMenu;
  const menu_is_active = menu.classList.contains('main-nav--opened');

  if (!its_menu && !its_btnMenu && menu_is_active) {
      toggleMenu();
  }
});

// Stick Menu //
window.onload = function() {
  function navFixed(e) {
    if(window.scrollY >= 115) {
      menu.classList.add('main-nav--is-fixed');
    } else {
      menu.classList.remove('main-nav--is-fixed');
    }
  }
  window.addEventListener('scroll', navFixed);
}

// search //

const search = document.querySelector(".search");
const btnSearch = document.querySelector(".search__toggle");
const toggleSearch = function() {
  search.classList.toggle('search--opened');
  search.classList.toggle('search--closed');
}

btnSearch.addEventListener('click', function(e) {
  e.stopPropagation();
  toggleSearch();
});

document.addEventListener('click', function(e) {
  const target = e.target;
  const its_search = target == search || search.contains(target);
  const its_btnSearch = target == btnSearch;
  const search_is_active = search.classList.contains('search--opened');

  if (!its_search && !its_btnSearch && search_is_active) {
    toggleSearch();
  }
});

// add/remove categories on window change

let navMainList = document.querySelector(".main-nav .category-list");
let navMainUserList = document.querySelector(".main-nav .user-list");
let catMainList = document.querySelector(".categories .category-list");

if (window.matchMedia("(max-width: 767px)").matches) {
  if (catMainList) {catMainList.remove();}
} else if (window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches) {
  if (navMainList) {navMainList.remove();}
  if (navMainUserList) {navMainUserList.remove();}
  if (catMainList) {catMainList.remove();}
} else if (window.matchMedia("(min-width: 1200px)").matches) {
  if (navMainList) {navMainList.remove();}
  if (navMainUserList) {navMainUserList.remove();}
}

// tabs //

let $tabs = function (target) {

  let
    _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
    _eventTabsShow,
    _showTab = function (tabsLinkTarget) {
      let tabsPaneTarget, tabsLinkActive, tabsPaneShow;
      tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
      tabsLinkActive = tabsLinkTarget.parentElement.parentElement.querySelector('.single-product-tab__nav-item--active');
      tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.single-product-tab__pane--active');
      // если следующая вкладка равна активной, то завершаем работу
      if (tabsLinkTarget === tabsLinkActive) {
        return;
      }
      // удаляем классы у текущих активных элементов
      if (tabsLinkActive !== null) {
        tabsLinkActive.classList.remove('single-product-tab__nav-item--active');
      }
      if (tabsPaneShow !== null) {
        tabsPaneShow.classList.remove('single-product-tab__pane--active');
      }
      // добавляем классы к элементам (в завимости от выбранной вкладки)
      tabsLinkTarget.parentElement.classList.add('single-product-tab__nav-item--active');
      tabsPaneTarget.classList.add('single-product-tab__pane--active');
      document.dispatchEvent(_eventTabsShow);
    },
    _switchTabTo = function (tabsLinkIndex) {
      let tabsLinks = _elemTabs.querySelectorAll('.single-product-tab__nav-item');
      if (tabsLinks.length > 0) {
        if (tabsLinkIndex > tabsLinks.length) {
          tabsLinkIndex = tabsLinks.length;
        } else if (tabsLinkIndex < 1) {
          tabsLinkIndex = 1;
        }
        _showTab(tabsLinks[tabsLinkIndex - 1]);
      }
    };
  _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

  _elemTabs.addEventListener('click', function (e) {
    let tabsLinkTarget = e.target;
    // завершаем выполнение функции, если кликнули не по ссылке
    if (!tabsLinkTarget.parentElement.classList.contains('single-product-tab__nav-item') || tabsLinkTarget.parentElement.classList.contains('single-product-tab__nav-item--notab')) {
      return;
    }
    // отменяем стандартное действие
    e.preventDefault();
    _showTab(tabsLinkTarget);
  });

  return {
    showTab: function (target) {
      _showTab(target);
    },
    switchTabTo: function (index) {
      _switchTabTo(index);
    }
  }

};
let listTabs = document.querySelectorAll('.single-product-tabs');
for (let i = 0, length = listTabs.length; i < length; i++) {
  $tabs(listTabs[i]);
}

// tab-anchor scroll to //

document.querySelectorAll('a[href^="#"].anchor-link').forEach(link => {

  link.addEventListener('click', function(e) {
      e.preventDefault();

      let href = this.getAttribute('href').substring(1);

      const scrollTarget = document.getElementById(href);

      const topOffset = document.querySelector('.single-product-tab__nav-list').offsetHeight;
      // const topOffset = 0; // если не нужен отступ сверху
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset - 60;

      window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
      });
  });
});

/* popup-city */

let cityLink = document.querySelectorAll(".city-choosing__city");

if (cityLink.length !== 0) {
  let popup = document.getElementById("modal__geo");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(cityLink, popup, popupClose);
}

/* popup-addCart */

let gridAddCartLink = document.querySelectorAll(".article-product-g__cart");

if (gridAddCartLink.length !== 0) {
  let popup = document.getElementById("modal__add-cart");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(gridAddCartLink, popup, popupClose);
}

let listAddCartLink = document.querySelectorAll(".article-product-l__cart");

if (listAddCartLink.length !== 0) {
  let popup = document.getElementById("modal__add-cart");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(listAddCartLink, popup, popupClose);
}

let productAddCartLink = document.querySelectorAll(".single-product__button-buy");

if (productAddCartLink.length !== 0) {
  let popup = document.getElementById("modal__add-cart");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(productAddCartLink, popup, popupClose);
}

/* popup-callback */

let productCallbackLink = document.querySelectorAll(".single-product__callback");

if (productCallbackLink.length !== 0) {
  let popup = document.getElementById("modal__callback");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(productCallbackLink, popup, popupClose);
}

/* popup-buyoc */

let sProductBuyocLink = document.querySelectorAll(".single-product__button-buyoc");

if (sProductBuyocLink.length !== 0) {
  let popup = document.getElementById("modal__buyoc");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(sProductBuyocLink, popup, popupClose);
}

let gridBuyocLink = document.querySelectorAll(".article-product-g__buyoneclick");

if (gridBuyocLink.length !== 0) {
  let popup = document.getElementById("modal__buyoc");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(gridBuyocLink, popup, popupClose);
}

let listBuyocLink = document.querySelectorAll(".article-product-l__buyoneclick");

if (listBuyocLink.length !== 0) {
  let popup = document.getElementById("modal__buyoc");
  let popupClose = popup.getElementsByClassName("modal__button--close");

  popupAction(listBuyocLink, popup, popupClose);
}

function popupAction(popupLink, popup, popupClose) {

  let toggleCity = function() {
    popup.classList.toggle('modal__show');
  }

  for (var i = 0; i < popupLink.length; i++) {
    popupLink[i].addEventListener("click", function (evt) {
      evt.stopPropagation();
      toggleCity();
    });
  }

  for (var i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener("click", function (evt) {
      if (popup.classList.contains("modal__show")) {
        evt.preventDefault();
        popup.classList.remove("modal__show");
        popup.classList.remove("modal__error");
      }
    });
  }

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains("modal__show")) {
        evt.preventDefault();
        popup.classList.remove("modal__show");
        popup.classList.remove("modal__error");
      }
    }
  });

  document.addEventListener('click', function(evt) {
    const target = evt.target;
    const its_popup = target == popup || popup.contains(target);
    const its_popupLink = target == popupLink;
    const popup_is_active = popup.classList.contains('modal__show');

    if (!its_popup && !its_popupLink && popup_is_active) {
      toggleCity();
    }
  });
}

/* grid-list */
let productsGrid = document.querySelector(".products-grid");
let productsList = document.querySelector(".products-list");

if (productsGrid && productsList) {
  let grid = document.querySelector(".sorting-filter__g-btn");
  let list = document.querySelector(".sorting-filter__l-btn");

  toggleGl(grid, list);

  function toggleGl(grid, list) {
    grid.addEventListener('click', function(evt) {
      productsGrid.style.display = "flex";
      list.classList.remove("sorting-filter__gl-btn--active");
      grid.classList.add("sorting-filter__gl-btn--active");
      productsList.style.display = "none";
    });

    list.addEventListener('click', function(evt) {
      productsGrid.style.display = "none";
      grid.classList.remove("sorting-filter__gl-btn--active");
      list.classList.add("sorting-filter__gl-btn--active");
      productsList.style.display = "flex";
    });
  }
}
