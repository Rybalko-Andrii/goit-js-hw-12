import { fetchImages, addPage, resetPage, page } from './js/pixabay-api';
import { markup } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const box = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

let currentQuery = '';

loadMoreBtn.classList.add('hide');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const inputValue = input.value.trim();

  if (!inputValue) {
    showError(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  currentQuery = inputValue;
  box.innerHTML = '';
  resetPage();
  loadMoreBtn.classList.add('hide');

  await loadImages(currentQuery);
  input.value = '';
});

loadMoreBtn.addEventListener('click', async () => {
  addPage();
  await loadImages(currentQuery, true);
});

async function loadImages(query, isLoadMore = false) {
  try {
    showLoader();

    const data = await fetchImages(query);

    if (data.hits.length === 0 && data.totalHits === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoader();
      return;
    }

    markup(data);

    if (isLoadMore) smoothScroll();

    if (
      data.hits.length < 40 ||
      data.hits.length + (page - 1) * 40 >= data.totalHits
    ) {
      loadMoreBtn.classList.add('hide');
      showError("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.classList.remove('hide');
    }

    hideLoader();
  } catch (error) {
    showError(error.message);
    hideLoader();
  }
}

function showError(message) {
  iziToast.error({ message });
}

function showLoader() {
  loader.classList.remove('hide');
}

function hideLoader() {
  loader.classList.add('hide');
}

function smoothScroll() {
  const { height: cardHeight } = box.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
