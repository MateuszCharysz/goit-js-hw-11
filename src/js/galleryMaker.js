'use strict'
import {log, httpCodeHandler, arrCompare, addLeadingZero} from './JsHelp'
import simpleLightbox from 'simplelightbox'
import Notiflix from 'notiflix'
import axios from 'axios'
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items' // FOR CSS TEST
(()=>{
  //DOM elements
  const gallery = document.querySelector('.gallery');
  //testing gallery styles
  const createItem = item => {
    let itemMarkup =
 `<a class="gallery__item" href="${item.original}">
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
  gallery.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
    // log(event.target);
    event.target.lightbox;
  });
})()

