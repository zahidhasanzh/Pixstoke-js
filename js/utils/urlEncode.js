/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

//convert Object to url and returns url string

export const urlEncode = urlObj => {
    return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#/g, "%23");
} 

let arr = ["apple", "orange", "mango"]
let newArray = Object.entries(arr).join("&").replace(/,/g, "=").replace(/#/g, "%23")

console.log(newArray);


