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

var navMainList = document.querySelector(".main-nav .category-list");
var navMainUserList = document.querySelector(".main-nav .user-list");
var catMainList = document.querySelector(".categories .category-list");

if (window.matchMedia("(max-width: 767px)").matches) {
  catMainList.remove();
} else if (window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches) {
  navMainList.remove();
  navMainUserList.remove();
  catMainList.remove();
} else if (window.matchMedia("(min-width: 1200px)").matches) {
  navMainList.remove();
  navMainUserList.remove();
}
