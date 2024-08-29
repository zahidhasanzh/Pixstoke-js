/**
 * @copyright Zahid Hassan 2024
 */

//import
import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";


//render curated photo in home page
const $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18)

client.photos.curated({page: 1, per_page: 20}, data => {
    $photoGrid.innerHTML = "";

   data.photos.forEach(photo => {
    const $photoCard  = photoCard(photo)

    $photoGrid.appendChild($photoCard)
   })
});