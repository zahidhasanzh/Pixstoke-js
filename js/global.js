/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

// import
import { ripple } from "./utils/ripple.js";
import { eaddEventOnElement } from "./utils/event.js"
import { urlDecode } from "./utils/urlDecode.js";

// Header on-scroll state

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active")
})


// add ripple effect

const $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));

/**
 * navbar toggler for mobile screen
 */

const $navToggler = document.querySelectorAll("[data-nav-toggler]");
const $navbar = document.querySelector("[data-navigation]");
const $scrim = document.querySelector("[data-scrim]");

eaddEventOnElement($navToggler, "click", function(){
    $navbar.classList.toggle("show");
    $scrim.classList.toggle("active");
})

/**
 * filter functionality
 */

window.filterObj = {};

// show all filtered option after reload

if(window.location.search.slice(1)){
  const search = urlDecode(window.location.search.slice(1))
  Object.entries(search).forEach(item => {
    const filterKey = item[0]
    const filterValue = item[1]

    window.filterObj[filterKey] = filterValue;
    if(filterKey !== "query"){
       const $filterItem = document.querySelector(`[data-filter="${filterKey}"]`);
       $filterItem?.querySelector("[data-filter-chip]").classList.add("selected");

       if($filterItem) $filterItem.querySelector("[data-filter-value]").innerText = filterValue;
    }
  })
}

//initial favorite object in local storage

if(!window.localStorage.getItem("favorite")){
    const favoriteObj = {
        photos: {},
        videos: {}
    }

    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj))
}

//page transition

window.addEventListener("loadstart", function(){
   document.body.style.opacity = "0"
})
window.addEventListener("DOMContentLoaded", function(){
   document.body.style.opacity = "1"
})