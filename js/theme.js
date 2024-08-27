/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

const $HTMl = document.documentElement;

let isDark = window.matchMedia("(prefers-color-scheme: dark)");


if(sessionStorage.getItem("theme")){
    $HTMl.dataset.theme = sessionStorage.getItem("theme")
}else{
    $HTMl.dataset.theme = isDark ? "dark" : "light"
}

const changeTheme = function(){
    isDark = sessionStorage.getItem("theme")
    console.log(isDark);
    sessionStorage.setItem("theme", isDark === "light" ? "dark" : "light");
    $HTMl.dataset.theme = sessionStorage.getItem("theme")
}

window.addEventListener("load", () => {
    const $themeBtn = document.querySelector("[data-theme-toggler]");
    $themeBtn.addEventListener("click", changeTheme)
})