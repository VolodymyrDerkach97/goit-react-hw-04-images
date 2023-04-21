import axios from 'axios';

const KEY = '34196458-ef7b15c4268daa5ba120fe84d';

axios.defaults.baseURL = `https://pixabay.com/api/`;
const pixabayFetch = async (search, page) => {
  const response = await axios.get(
    `?q=${search}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );

  console.log(response.data);
  return response.data.hits;
};

export default pixabayFetch;
