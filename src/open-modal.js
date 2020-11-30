
export default class modalImage{
    constructor(){
         this.galleryContainer = document.querySelector('#list-cont');
         this.openModal = document.querySelector('.lightbox');
         this.closeModal = document.querySelector('.lightbox__button');
         this.lighboxImage = document.querySelector('.lightbox__image');
         this.lighboxOverlay = document.querySelector('.lightbox__overlay');
    }
init(){
    this.galleryContainer.addEventListener('click', (e)=>this.onGalleryContainerClick(e));
    this.closeModal.addEventListener('click', (e)=>this.onCloseButtonClick(e));
    this.lighboxOverlay.addEventListener('click',(e)=>this.onCloseButtonClick(e));

};
    

 onGalleryContainerClick(evt) {
    evt.preventDefault();
    console.log(evt.target);

    this.lighboxImage.src = evt.target.getAttribute('data-source');
    this.openModal.classList.add('is-open');
        
};

 onCloseButtonClick() {
    this.openModal.classList.remove('is-open');
    this.lighboxImage.src ="//:0";
};

}




    