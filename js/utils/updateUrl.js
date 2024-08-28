/**
 * @copyright Zahid Hassan 2024
 */

"use strict";
//import
import { urlEncode } from "./urlEncode.js";

//filter obj and search type eg. "videos" or "photos"

export const updateUrl = (filterObj, searchType) => {
     setTimeout(() => {
        const root = window.location.origin;
        const searchQuery = urlEncode(filterObj);

         window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
       
     }, 500)
}