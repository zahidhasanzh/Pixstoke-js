/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

import { eaddEventOnElement } from "./utils/event.js";

export const menu = function($menuWrapper, callback){
    const $menu = $menuWrapper.querySelector("[data-menu]");
    const $menuTogglers = $menuWrapper.querySelectorAll("[data-menu-toggler]");
    const $menuItems = $menuWrapper.querySelectorAll("[data-menu-item]");


    eaddEventOnElement($menuTogglers, "click", () => {
        $menu.classList.toggle("expanded");
    });

    eaddEventOnElement($menuItems, "click", function() {
        $menu.classList.remove("expanded")
        if(callback) callback(this.dataset.menuItem)
    })
}
