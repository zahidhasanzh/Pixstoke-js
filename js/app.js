/**
 * @copyright Zahid Hassan 2024
 */

//import
import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";
import { gridInit, updateGrid } from "./utils/masonry_grid.js";



//render curated photo in home page
const $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18)

client.photos.curated({page: 1, per_page: 20}, data => {
    $photoGrid.innerHTML = "";
    
    const photoGrid = gridInit($photoGrid)

   data.photos.forEach(photo => {
    const $photoCard  = photoCard(photo)

   updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns)
   })
});