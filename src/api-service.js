const API_KEY = '19280898-6ce77fd5c708cfadb8184ec4d';
const BASE_URL = 'https://pixabay.com/api/';

  export default class ImageApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
    }
    

    fetchArticles() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&${this.page}&per_page=12&key=${API_KEY}`;
        const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            }};
        return fetch(url, options)

          .then(response =>
            {
            this.incrementPage();
             return response.json();
            });
          
      }

      incrementPage() {
        this.page += 1;
      }
    
      resetPage() {
        this.page = 1;
      }
    
      get query() {
        return this.searchQuery;
      }
    
      set query(newQuery) {
        this.searchQuery = newQuery;
      }
    }



