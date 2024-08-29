/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

import { ripple } from "./utils/ripple.js";
import { eaddEventOnElement } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";

const $searchTogglers = document.querySelectorAll("[data-search-toggler]");
const $searchView = document.querySelector("[data-search-view]");

eaddEventOnElement($searchTogglers, "click", () =>
  $searchView.classList.toggle("show")
);

// search clear

const $searchField = document.querySelector("[data-search-field]");
const $searchClose = document.querySelector("[data-search-clear-btn]");

$searchClose.addEventListener("click", () => ($searchField.value = ""));

// search type
const $searchSegment = document.querySelector("[data-segment='search']");
const $activeSegmentBtn = document.querySelector("[data-segment-btn].selected");

window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, segmentValue => window.searchType = segmentValue)

// search submit
const $searchBtn = document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", function() {
    const searchValue = $searchField.value.trim();
    if(searchValue){
        updateSearchHistory(searchValue);
        window.filterObj.query = searchValue;
        updateUrl(window.filterObj, window.searchType)
    }
});

//submit search when press on "Enter" key

$searchField.addEventListener("keydown", e => {
    if(e.key === "Enter" && $searchField.value.trim()) $searchBtn.click();
})

// initial search history
let searchHistory = {items: [] };


if(window.localStorage.getItem("search_history")){
   
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"))
}else{
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory))
}
// update search history

const updateSearchHistory = searchValue => {
    /**
     * if the searched value is already present in search list then remove that one and add the search
     * value at the beginning of the search list
     * this ensures that the most recent search is at the top of the history
     */

    if(searchHistory.items.includes(searchValue)){
       searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1)
    }
    searchHistory.items.unshift(searchValue);

    window.localStorage.setItem("search_history", JSON.stringify(searchHistory))
}

/**
 * render search history items in search list
 */

const $searchList = document.querySelector("[data-search-list]");

const historyLen = searchHistory.items.length;

for(let i = 0; i < historyLen & i <= 5; i++){
    const $listItem = document.createElement("button");
    $listItem.classList.add("list-item");

    $listItem.innerHTML = `
        <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
        <span class="body-large-text">${searchHistory.items[i]}</span>
        <div class="state-layer"></div>
    `;
    ripple($listItem)

    $listItem.addEventListener("click", function() {
        $searchField.value = this.children[1].textContent
        $searchBtn.click()
    })

    $searchList.appendChild($listItem)
}

