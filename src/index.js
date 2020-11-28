import ImageApiService from './api-service';
import { debounce } from 'debounce';
import imageCardTp from './templates/cardImage.hbs';

const formText = document.querySelector('#search-form');
const searchLine = document.querySelector('.search-line');
const contentList = document.querySelector('#list-cont');
const loadMoreBtn = document.querySelector('.button-more');
let ApiService = null;

const debounceRenderImage = debounce(function () {
  ApiService = new ImageApiService();
  ApiService.searchQuery = searchLine.value;
  ApiService.fetchArticles().then(renderImageCard).catch(onFetchError);
}, 500);

formText.addEventListener('input', debounceRenderImage);

formText.addEventListener('submit', submitSechPicter);
loadMoreBtn.addEventListener('click', fetchImages);

function submitSechPicter(e) {
  e.preventDefault();
  debounceRenderImage();
}

function renderImageCard(response) {
  let markup = null;
  markup = imageCardTp(response);
  contentList.innerHTML = markup;
  console.log(response);
}

function onFetchError(response) {
  console.log(response);
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
