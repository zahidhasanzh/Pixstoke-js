/**
 * @copyright Zahid Hassan 2024
 */
"use strict";

// import

import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";

// add ripple effect

const $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));


//page transition

window.addEventListener("loadstart", function(){
    document.body.style.opacity = "0"
 })
 window.addEventListener("DOMContentLoaded", function(){
    document.body.style.opacity = "1"
 })

//  menu toggle

const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers.forEach($menuWrapper => {
    menu($menuWrapper)
})

// add to favorite
const favoritePhotos = JSON.parse(window.localStorage.getItem("favorite")).photos
const $favoriteBtn = document.querySelector("[data-add-favorite]");
const photoId = window.location.search.split("=")[1];

$favoriteBtn.classList[favoritePhotos[photoId] ? "add" : "remove"]("active");

favorite($favoriteBtn, "photos", photoId);



const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");

client.photos.detail(photoId, data => {
   

   const {
    avg_color,
    height,
    width,
    photographer,
    alt,
    src

   } = data;

   $downloadLink.href = src.original;


   Object.entries(src).forEach(item => {
        const [key, value] = item;

      $downloadMenu.innerHTML += `
         <a href="${value}" download class="menu-item" data-ripple data-menu-item>
            <span class="label-large text">${key}</span>
            <div class="state-layer"></div>
        </a>
      
      `
   })

   $detailWrapper.innerHTML = `
   
    <figure class="detail-banner" style="aspect-ratio: ${width} / ${height}; background-color: ${avg_color}">
        <img src="${src.large2x}" width="${width}" height="${height}" alt="${alt}" class="img-cover">
    </figure>
    <p class="title-small">Photograph by <span class="color-primary">${photographer}</span></p>
   
   `

   const $detailImg = $detailWrapper.querySelector("img")
   console.log($detailImg);

   $detailImg.style.opacity = 0;
   $detailImg.addEventListener("load", function(){
        this.animate({
            opacity: 1
        }, {duration: 400, fill: "forwards"});

        if(alt){
            client.photos.search({query: alt, page: 1, per_apge: 30}, data => {
                loadSimilar(data)
            })
        }else{
            $loader.style.display = "none";
            $photoCard.innerHTML = "<p>No similar photo found.</p>"
        }
   })


});

// load similar photos

const $photoCard = document.querySelector("[data-photo-grid]");
const photoGrid = gridInit($photoCard);
const $loader = document.querySelector("[data-loader]")

const loadSimilar = function(data){
    data.photos.forEach(photo => {
        const $card = photoCard(photo)
        updateGrid($card, photoGrid.columnsHeight, photoGrid.$columns);
        $loader.style.display = "none"
    })
}