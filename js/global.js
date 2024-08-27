/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

// Header on-scroll state

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active")
})