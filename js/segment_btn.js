/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

// import
 import { eaddEventOnElement } from "./utils/event.js";

 export const segment = function($segment, callback){
    const $segmentBtns = $segment.querySelectorAll("[data-segment-btn]");
    let $lastSelectedSegmentBtn = $segment.querySelector("[data-segment-btn].selected")

    eaddEventOnElement($segmentBtns, "click", function() {
        $lastSelectedSegmentBtn.classList.remove("selected");
        this.classList.add("selected");
        $lastSelectedSegmentBtn = this;

        callback(this.dataset.segmentValue)
    })
 }