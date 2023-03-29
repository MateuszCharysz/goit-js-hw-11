'use strict';
import { log, httpCodeHandler, arrCompare, addLeadingZero } from './JsHelp';
import simpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';
import { drawGallery } from './drawGallery';
import 'simplelightbox/dist/simple-lightbox.min.css';
import JsLocalStorage from './JsLocalStorage';
//AXIOS
//LOCAL STORAGE INITIALIZATION
JsLocalStorage.save(prompt, 'all');
const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,
  axiosURL: `?key=34758818-84286f7512264df00409bd0b7&q=${JsLocalStorage.load(
    prompt,
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`,
});
const pixabayAPIpagination = async () => {};
const pixabayAPIluncher = async querry => {
  JsLocalStorage.save(prompt, querry);
  //const axiosURL = `?key=34758818-84286f7512264df00409bd0b7&q=${querry}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;
  const response = await pixabayAPI.get(pixabayAPI.axiosURL).catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  try {
    if (response.data.totalHits === 0) {
      Notiflix.Notify.failure(
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
    .replace(/\s+/g, ' ');
  if (pureQuerry.length > 100) {
    Notiflix.Notify.warning(
      'Search querry is to long. Please use maximum 100 characters (spaces included)',
    );
  } else if (pureQuerry.length === 0) {
    Notiflix.Notify.info('Search field was empty. Please use letters');
  } else {
    const querryInput = pureQuerry.replace(' ', '+');
    pixabayAPIluncher(querryInput);
  }
};
photosearch.addEventListener('submit', submitHandler);
