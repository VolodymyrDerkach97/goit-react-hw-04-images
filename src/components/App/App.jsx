import { useState, useEffect } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';

import pixabayFetch from '../../services/pixabay-api';
const Scroll = require('react-scroll');
const scroll = Scroll.animateScroll;

const amountOfImgPerPage = 12;

const INITIAL_VALUE = {
  cards: [],
  submitValue: '',
  page: null,
  isLoading: false,
  error: null,
  visibleLoadButton: false,
};

const App = () => {
  const [cards, setCards] = useState(INITIAL_VALUE.cards);
  const [submitValue, setSubmitValue] = useState(INITIAL_VALUE.submitValue);
  const [page, setPage] = useState(INITIAL_VALUE.page);
  const [isLoading, setIsLoading] = useState(INITIAL_VALUE.isLoading);
  const [error, setError] = useState(INITIAL_VALUE.error);
  const [visibleLoadButton, setVisibleLoadButton] = useState(
    INITIAL_VALUE.visibleLoadButton
  );

  useEffect(() => {
    if (submitValue === INITIAL_VALUE.submitValue) {
      return;
    }
    setIsLoading(true);
    setVisibleLoadButton(false);
    const normalaizeFeatch = response => {
      return response.hits.map(res => {
        return {
          id: res.id,
          webformatURL: res.webformatURL,
          largeImageURL: res.largeImageURL,
          tags: res.tags,
        };
      });
    };

    const featchImage = async () => {
      try {
        const response = await pixabayFetch(submitValue, page);
        const res = normalaizeFeatch(response);
        setCards(prev => [...prev, ...res]);

        const lastPage = response.total / amountOfImgPerPage;

        lastPage >= page
          ? setVisibleLoadButton(true)
          : setVisibleLoadButton(false);

        if (page >= 2) {
          const windowInnerHeight = document.documentElement.clientHeight;
          scroll.scrollMore(windowInnerHeight - 160);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    featchImage();
  }, [page, submitValue]);

  const handelSubmit = data => {
    if (submitValue === data) {
      return;
    }
    setSubmitValue(data);
    setPage(1);
    setCards([]);
  };

  const onLoadMore = e => setPage(prev => prev + 1);

  const isSuccessfulSerch = cards.length <= 0 ? true : false;
  return (
    <AppContainer>
      <Searchbar onSubmit={handelSubmit} />
      <ImageGallery cards={cards} />
      {isLoading && <Loader />}
      {isSuccessfulSerch && (
        <Message
          submitValue={submitValue}
          isLoading={isLoading}
          error={error}
        />
      )}
      {visibleLoadButton && (
        <Button onClick={onLoadMore} isLoading={isLoading} />
      )}
    </AppContainer>
  );
};

export default App;
