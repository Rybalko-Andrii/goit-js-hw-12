import { markup } from '/js/render-functions';
import { removeLoadStroke } from '/js/render-functions';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const load = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let perPage = 40;

export function resetPage() {
  page = 1;
}
export function addPage() {
  page += 1;
}

function endOfList(daddyElement) {
  removeLoadStroke(daddyElement);
  daddyElement.insertAdjacentHTML(
    'beforeend',
    "<p>We're sorry, but you've reached the end of search results .</p>"
  );
  loadMoreBtn.classList.add('hide');
}

export async function getImage(input) {
  const API_KEY = '48621636-2f551eda37f80f5c324cc68cd';
  const query = encodeURIComponent(input);
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });
  const URL = `https://pixabay.com/api/?${urlParams}`;

  try {
    const { data } = await axios.get(URL);
    markup(data);
    if (data.totalHits < page * perPage) {
      endOfList(load);
      return;
    }
    if (page >= 2) {
      const list = document.querySelector('.gallery-item');
      const rect = list.getBoundingClientRect();
      window.scrollBy({
        top: rect.height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error(error);
    gallery.innerHTML = '';
    load.innerHTML = '';
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
    return;
  }
}
