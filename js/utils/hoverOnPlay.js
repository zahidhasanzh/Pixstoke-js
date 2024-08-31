/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

export const  hoverOnPlay = function($card){
    const $cardVideo = $card.querySelector("[data-video]");
    const $cardBadge = $card.querySelector("[data-card-badge]");

    let isPlaying = false;
    let playIimeout;

    $card.addEventListener("pointerover", function() {
        playIimeout = setTimeout(() => {
            $cardBadge.style.display = "none";

            $cardVideo.play().then(res => {
                isPlaying = true;
    
            }).catch(err => {
                isPlaying =false
            })


        }, 500);
        
    });
    $card.addEventListener("pointerout", function() {
        playIimeout && clearTimeout(playIimeout);
        $cardBadge.style.display = "grid";
        if(isPlaying) $cardVideo.pause();
    });
}