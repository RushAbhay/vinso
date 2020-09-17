"use strict";

let popularPproductSlider = document.getElementById("popular-product__slider");
let popularPproductNext = document.getElementsByClassName("slider__pro-after");
let popularPproductPrev = document.getElementsByClassName("slider__pro-before");
let popularPproductItem = document.getElementById("popular-product__slide");

productScroll(popularPproductSlider, popularPproductNext, popularPproductPrev, popularPproductItem)

let ourPartnersSlider = document.getElementById("our-partners__slider");
let ourPartnersNext = document.getElementsByClassName("slider__part-after");
let ourPartnersPrev = document.getElementsByClassName("slider__part-before");
let ourPartnersItem = document.getElementById("our-partners__slide");

productScroll(ourPartnersSlider, ourPartnersNext, ourPartnersPrev, ourPartnersItem)

function productScroll(slider, next, prev, item) {
  for (let i = 0; i < next.length; i++) {
    //refer elements by class name

    let position = 0; //slider postion

    prev[i].addEventListener("click", function () {
      //click previos button
      if (position > 0) {
        //avoid slide left beyond the first item
        position -= 1;
        translateX(position, item); //translate items
      }
    });

    next[i].addEventListener("click", function () {
      if (position >= 0 && position < hiddenItems()) {
        //avoid slide right beyond the last item
        position += 1;
        translateX(position, item); //translate items
      }
    });
  }

  function hiddenItems() {
    //get hidden items
    let items = getCount(item, false);
    let visibleItems = slider.offsetWidth / 300;

    if (window.matchMedia("(max-width: 767px)").matches) {
      visibleItems = slider.offsetWidth / 300;
    } else if (
      window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches
    ) {
      visibleItems = slider.offsetWidth / 325;
    } else if (window.matchMedia("(min-width: 1200px)").matches) {
      visibleItems = slider.offsetWidth / 281;
    }

    return items - Math.ceil(visibleItems);
  }
}

function translateX(position, slide) {
  //translate items
  if (window.matchMedia("(max-width: 767px)").matches) {
    slide.style.left = position * -300 + "px";
  } else if (
    window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches
  ) {
    slide.style.left = position * -325 + "px";
  } else if (window.matchMedia("(min-width: 1200px)").matches) {
    slide.style.left = position * -281 + "px";
  }
}

function getCount(parent, getChildrensChildren) {
  //count no of items
  let relevantChildren = 0;
  let children = parent.childNodes.length;
  for (let i = 0; i < children; i++) {
    if (parent.childNodes[i].nodeType != 3) {
      if (getChildrensChildren)
        relevantChildren += getCount(parent.childNodes[i], true);
      relevantChildren++;
    }
  }
  return relevantChildren;
}
