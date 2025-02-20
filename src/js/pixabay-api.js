import axios from 'axios';

const API_KEY = '48820894-4cea1e59d649a954e9231553f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, per_page = 40) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

  const response = await axios.get(url);
  return { images: response.data.hits, total: response.data.totalHits };
}
