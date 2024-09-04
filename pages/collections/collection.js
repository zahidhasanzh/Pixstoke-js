/**
 * @copyright Zahid Hassan 2024
 */

"use strict";
//import

import { client } from "../../js/api_configure.js";
import { collectionCard } from "../../js/collection_card.js";

// render featured collections

const $collectionGrid = document.querySelector("[data-collection-grid]");
const perPage = 36;
let currentPage = 1;
let totalPage = 0;

const loadCollections = function (page){
    client.collections.featured({per_page: perPage, page: page}, data => {
       
        totalPage = Math.ceil(data.total_results / perPage);
       
        data.collections.forEach(collecton => {
            const $collectionCard = collectionCard(collecton);
            $collectionGrid.appendChild($collectionCard)
        })

        isloaded = true;
      (currentPage >= totalPage) && ($loader.style.display = 'none')
      
    })
}
loadCollections(currentPage)

//load more collection

const $loader = document.querySelector("[data-loader]");
let isloaded = false;
const loadMore = function() {
    if($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isloaded){
        currentPage++;
        loadCollections(currentPage);
        isloaded = false;
    }
}

window.addEventListener("scroll", loadMore)