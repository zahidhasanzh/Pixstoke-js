/**
 * @copyright Zahid Hassan 2024
 */
"use strict"; 

 export const eaddEventOnElement = function($elements, eventType, callback){
    $elements.forEach($element => $element.addEventListener(eventType, callback))
}