import axios from 'axios';
export function handleFetch(request, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '36690405-f92c0f105f779f58b92394553';
  return axios
    .get(
      `${BASE_URL}?key=${KEY}&q=${request}&per_page=12&page=${page}&image_type=photo&orientation=horizontal`
    )
    .then(response => response.data)
    .catch(err => console.log(err));
}
