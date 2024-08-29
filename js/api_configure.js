/**
 * @copyright Zahid Hassan 2024
 */

"use strict";

//import

import { urlEncode } from "./utils/urlEncode.js";


// api key
const API_KEY = "vKjbzRILUDGaiBbYPRh78EApXuitfrdrEzXXvPi0q0jTLBeNFpBu5QLH";


const headers = new Headers();


headers.append("Authorization", API_KEY);

const requestOptions = {headers};

const fetchData = async function (url, successCallback) {
    const response = await fetch(url, requestOptions);
    if(response.ok){
        const data = await response.json();

        successCallback(data);
    }
}
let requestUrl = ""

const root = {
    default: "https://api.pexels.com/v1/",
    videos: "https://api.pexels.com/videos/",
}

export const client = {
    photos: {
        //search photo
        search(parameters, callback){
            requestUrl = `${root.default}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback)
        },
        // curated photo
        curated(parameters, callback){
            fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback)
        },

        //get single photo detail
        detail(id, callback){
            fetchData(`${root.default}photos/$${id}`, callback)
        }
    },
    videos: {
        //search videos
        search(parameters, callback){
            requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback)
        },
        // popular videos
        popular(parameters, callback){
            fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback)
        },

        //get single videos detail
        detail(id, callback){
            fetchData(`${root.videos}videos/$${id}`, callback)
        }
    },
     collections: {
       
        // get fetured collections
        featured(parameters, callback){
            requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`
            fetchData(requestUrl, callback)
        },

        //get a collection medias and parameters Url object
        detail(id, parameters, callback){
            requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
            fetchData(`${root.default}photos/$${id}`, callback);
            fetchData(requestUrl, callback)
        }
    },
    // videos: {
    //     //search videos
    //     search(parameters, callback){
    //         requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
    //         fetchData(requestUrl, callback)
    //     },
    //     // popular videos
    //     popular(parameters, callback){
    //         fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback)
    //     },

    //     //get single videos detail
    //     detail(id, callback){
    //         fetchData(`${root.videos}videos/$${id}`, callback)
    //     }
    // },
}