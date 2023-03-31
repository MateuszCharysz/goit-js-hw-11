'use strict';
import { log, httpCodeHandler, arrCompare, addLeadingZero } from './JsHelp';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
// import axios from 'axios';
import { drawGallery, appendGallery } from './renderGallery';
import { cntrMathWithUpload } from './counterMath';
import JsLocalStorage from './JsLocalStorage'; //save load remove
import { APIurl } from './APIurl';
import { pixabayAPIluncher } from './fetchphotos';

const pixabayAPIpagination = async () => {
  cntrMathWithUpload('page'); /// counterMatch
  try {
  const response = await pixabayAPIluncher(APIurl()); ///APIurl and fetchphotos
    appendGallery(response); ///galleryMaker
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure(
      'Shit went south with pagination.. :( Get Dev to check console',
    );
    console.log(error.name);
    console.log(error.message);
  }
};
const pixabayAPIquerry = async querry => {
  JsLocalStorage.save('prompt', querry);
  JsLocalStorage.save('page', 1);
  const response = await pixabayAPIluncher(APIurl()); ///APIurl and fetchphotos
  try {
    if (response.data.totalHits === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`,
      );
      drawGallery(response);
      lightbox.refresh();
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Shit went south with querry.. :( Get Dev to Check console',
    );
    console.log(error.name);
    console.log(error.message);
  }
};

//DOM elements
const gallery = document.querySelector('.gallery');
const photosearch = document.querySelector('#search-form');
//testing gallery styles

//lightbox
const lightbox = new simpleLightbox('.gallery a', {
  captionSelector: event => event.firstElementChild,
  captionsData: 'alt',
  captionDelay: 250,
});

//Events
//Lightbox opening
gallery.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName !== 'A') return;
  event.target.lightbox;
});
// INPUT
const submitHandler = event => {
  event.preventDefault();
  let listToClear = document.querySelectorAll('[toClear]');
  listToClear.forEach(el => el.remove());
  const { searchQuery } = event.currentTarget;
  const pureQuerry = searchQuery.value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' '); // \s - any white symbol + one or more g globaly/across whole string
  if (pureQuerry.length > 100) {
    Notiflix.Notify.warning(
      'Search querry is to long. Please use maximum 100 characters (spaces included)',
    );
  } else if (pureQuerry.length === 0) {
    Notiflix.Notify.info('Search field was empty. Please use letters');
  } else {
    const querryInput = pureQuerry.replace(' ', '+');
    pixabayAPIquerry(querryInput);
  }
};
photosearch.addEventListener('submit', submitHandler);
