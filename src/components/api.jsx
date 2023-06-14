const API_KEY = '37041202-1594c8105fa8f1138959983fe';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  });

  const url = `${BASE_URL}?${searchParams}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.hits;
}
