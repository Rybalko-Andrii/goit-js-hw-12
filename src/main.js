import { getImage } from './js/pixabay-api';
import { resetPage } from './js/pixabay-api';
import { addPage } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const box = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

form.addEventListener('submit', event => {
  event.preventDefault();
  let inputValue = input.value.trim();
  if (!inputValue) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }
  box.innerHTML = '';
  resetPage();
  getImage(inputValue);
});

loadMoreBtn.addEventListener('click', event => {
  let inputValue = input.value.trim();
  addPage();
  getImage(inputValue);
});
