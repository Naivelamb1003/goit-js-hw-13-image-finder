import ImageApiService from './api-service';
import { debounce } from 'debounce';
import imageCardTp from './templates/cardImage.hbs';
import modalImage from './open-modal.js';
import './main.css';
import './images/icon-close.svg';
import { alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const formText = document.querySelector('#search-form');
const searchLine = document.querySelector('.search-line');
const contentList = document.querySelector('#list-cont');
const loadMoreBtn = document.querySelector('.button-more');

const controlModalImage = new modalImage();
controlModalImage.init();

let ApiService = null;
loadMoreBtn.disabled = true;

const debounceRenderImage = debounce(function () {
  
  loadMoreBtn.disabled = false;
  ApiService = new ImageApiService();
  if(searchLine.value !='') {
    ApiService.searchQuery = searchLine.value;
    ApiService.fetchArticles().then(renderImageCard).catch(onFetchError);
  }
    
}, 500);

searchLine.addEventListener('input', debounceRenderImage);
formText.addEventListener('submit', submitSechPicter);
loadMoreBtn.addEventListener('click', fetchImages);

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
});

function submitSechPicter(e) {
  e.preventDefault();
  debounceRenderImage();
}

function renderImageCard(response) {
  let markup = null;
  if (response.status == 404){
    onNotFoundError();
    }else{
      markup = imageCardTp(response);
      contentList.innerHTML = markup;
    }
   
}

function onFetchError(response) {
  if(searchLine.value === ''){
    alert({
      text: 'Lost connection',
      stack: myStack,
    });
  }
}

function onNotFoundError() {
  alert({
    text: 'Images not found',
    stack: myStack,
  });
}

function fetchImages() {
  loadMoreBtn.disabled = true;
  const scrollToY =
    loadMoreBtn.getBoundingClientRect().top +
    window.pageYOffset;
  ApiService.incrementPage();
  ApiService.fetchArticles()
    .then(response => {
      appendResponseMarkup(response);
      loadMoreBtn.disabled = false;
    })
    .then(() =>
      window.scroll({
        top: scrollToY,
        left: 0,
        behavior: 'smooth',
      }),
    );
}

function appendResponseMarkup(response) {
  contentList.insertAdjacentHTML('beforeend', imageCardTp(response));
}
