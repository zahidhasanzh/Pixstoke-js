/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

// import
import { ripple } from "./utils/ripple.js";
import { eaddEventOnElement } from "./utils/event.js"

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

//initial favorite object in local storage

if(!window.localStorage.getItem("favorite")){
    const favoriteObj = {
        photos: {},
        videos: {}
    }

    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj))
}