import axios from 'axios';

const KEY = '34196458-ef7b15c4268daa5ba120fe84d';

axios.defaults.baseURL = `https://pixabay.com/api/`;
const param = new URLSearchParams({
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '12',
});
const pixabayFetch = async (search, page) => {
  const response = await axios.get(
    `?q=${search}&page=${page}&key=${KEY}&${param}`
  );

  return response.data;
};

export default pixabayFetch;
