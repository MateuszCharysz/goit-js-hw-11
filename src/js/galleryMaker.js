'use strict';
import { log, httpCodeHandler, arrCompare, addLeadingZero } from './JsHelp';
import simpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';
// import debounce from 'lodash.debounce';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items'; // FOR CSS TEST
//AXIOS
const axios = require('axios').default;
const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000
});
const pixabayAPIluncher = async (querry) =>{
  const axiosURL = `?key=34758818-84286f7512264df00409bd0b7&q=${querry}&image_type=photo&safesearch=true&page=1&per_page=40`;
  const response = await pixabayAPI.get(axiosURL)
  return log(response)}
  // zapisać do local storage i stamtąd renderować? czy 
(() => {


  //DOM elements
  const gallery = document.querySelector('.gallery');
  const photosearch = document.querySelector('#search-form');
//testing gallery styles
  const createItem = item => {
    let itemMarkup = `<a class="gallery__item" href="${item.original}" toClear>
  <img class="gallery__image" src="${item.preview}" alt="${item.description}" loading="lazy"/>
  <div class="gallery__image-info">
    <div class="gallery__image-info-item">
        <p><b>Likes</b></p>
        <p class="gallery__image-info-display">NUMBER</p>
    </div>
        <div class="gallery__image-info-item">
        <p><b>Views</b></p>
        <p class="gallery__image-info-display">NUMBER</p>
    </div>
    <div class="gallery__image-info-item">
        <p><b>Comments</b></p>
        <p class="gallery__image-info-display">NUMBER</p>
    </div>
    <div class="gallery__image-info-item">
        <p><b>Downloads</b></p>
        <p class="gallery__image-info-display">NUMBER</p>
    </div>
  </div>
  </a>
  `;
    return itemMarkup;
  };

  const drawGallery = galleryItems.map(item => createItem(item)).join('');
  gallery.innerHTML = drawGallery;

//lightbox
  const lightbox = new SimpleLightbox('.gallery .gallery__item', {
    captionSelector: event => event.firstElementChild,
    captionsData: 'alt',
    captionDelay: 250,
  });

//Events
  //Lightbox opening
  gallery.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
    // log(event.target);
    event.target.lightbox;
  });
  // INPUT
  const submitHandler = event => {event.preventDefault();
      let listToClear = document.querySelectorAll('[toClear]');
      listToClear.forEach(el => el.remove());
  const { searchQuery } = event.currentTarget;
  const pureQuerry = searchQuery.value.trim().toLowerCase().replace(/\s+/g, ' ');
  if (pureQuerry.length >100) {Notiflix.Notify.warning('Search querry is to long. Please use maximum 100 characters (spaces included)')} else if 
  (pureQuerry.length === 0) {Notiflix.Notify.info('Search field was empty. Please use letters')} else {
   const querryInput = pureQuerry.replace(' ', '+')
   pixabayAPIluncher(querryInput)
  } 
}
  photosearch.addEventListener('submit', submitHandler);
})();
