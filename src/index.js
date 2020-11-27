import ImageApiService from './api-service';
import { debounce } from 'debounce';
import imageCardTp from './templates/cardImage.hbs';

const formText = document.querySelector('#search-form');
const contentList = document.querySelector('#list-cont'); 


const debounceRenderImage = debounce(function () {
  const ApiService = new ImageApiService();
  ApiService.searchQuery = 
  ApiService.fetchArticles()
      .then(renderImageCard)
      .catch(onFetchError);
  }, 500);
  
  formText.addEventListener('input', debounceRenderImage);

  formText.addEventListener('submit', debounceRenderImage);
  event.preventDefault();

  function renderImageCard(response){
    let markup = null;
    markup = imageCardTp(response);
    contentList.innerHTML = markup;
     console.log(response);
  };

  function onFetchError(response){
    console.log(response);
  };