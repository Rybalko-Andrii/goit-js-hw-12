import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const per_page = 40;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements.query.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  resetSearch();
  await fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  loader.style.display = 'block';

  try {
    const { images, total } = await fetchImages(query, page, per_page);
    totalHits = total;

    if (images.length === 0) {
      iziToast.error({
        message: 'Sorry, no images found. Please try again!',
      });
      return;
    }

    renderImages(images);

    if (page * per_page >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
}

function resetSearch() {
  gallery.innerHTML = '';
  page = 1;
  totalHits = 0;
  loadMoreBtn.style.display = 'none';
}

function smoothScroll() {
  const cardHeight =
    document.querySelector('.gallery-item')?.getBoundingClientRect().height ||
    0;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
