/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

// import
import { ripple } from "./utils/ripple.js";

// Header on-scroll state

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active")
})


// add ripple effect

const $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem))

/**
 * filter functionality
 */

window.filterObj = {}