/**
 * @copyright Zahid Hassan 2024
 */
"use strict";

//import
import { client } from "../../js/api_configure.js";
import { gridInit , updateGrid} from "../../js/utils/masonry_grid.js"
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";


//show filter bar if search anything

const $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";

/**
 * render curated or searched photos
 * if search something then render searched photos
 * otherwise render curated photos
 */

const $photoGrid = document.querySelector("[data-photo-grid]");
const $title = document.querySelector("[data-title]")
const photoGrid = gridInit($photoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} photos` : "Curated photos"

$title.textContent = title;
document.title = title


//render all photo
const renderPhotos = function (currentPage){
    client.photos[searchObj ? "search" : "curated"]({...searchObj, per_page: perPage, page: currentPage}, data => {
        
        totalPage = Math.ceil(data.total_results / perPage)
        
        data.photos.forEach(photo => {
            const $photoCard = photoCard(photo)

            updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns)
        })

        //when photos loaded
        isloaded = true;

        //when no more photo found, hide loader

        if(currentPage >= totalPage) $loader.style.display = 'none'

    })
}

renderPhotos(currentPage)

//load more photos

const $loader = document.querySelector("[data-loader]");
let isloaded = true;

window.addEventListener("scroll", function(){
   

    if($loader.getBoundingClientRect().top < (this.window.innerHeight * 2) && currentPage <= totalPage && isloaded){
        currentPage++;
        renderPhotos(currentPage);
        isloaded = false
    }
})