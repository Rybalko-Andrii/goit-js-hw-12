import axios from 'axios';

export let page = 1;
const perPage = 40;

export function resetPage() {
  page = 1;
}

export function addPage() {
  page += 1;
}

export async function fetchImages(query) {
  const API_KEY = '48621636-2f551eda37f80f5c324cc68cd';
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
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}
