import { Component } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';

import pixabayFetch from '../../services/pixabay-api';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    cards: [],
    submitValue: '',
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    modalImg: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { submitValue, page } = this.state;
    if (submitValue !== prevState.submitValue) {
      this.setState({ isLoading: true, page: 1 });
      try {
        const response = await pixabayFetch(submitValue, page);

        const res = this.normalaizeFeatch(response);
        this.setState({ cards: [...res] });
        window.scrollTo({ top: 0, left: 0 });
        return;
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (page !== prevState.page) {
      this.setState({ isLoading: true });

      try {
        const response = await pixabayFetch(submitValue, page);
        const res = this.normalaizeFeatch(response);
        this.setState(prevState => {
          return {
            cards: [...prevState.cards, ...res],
          };
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  normalaizeFeatch = response => {
    return response.map(res => {
      return {
        id: res.id,
        webformatURL: res.webformatURL,
        largeImageURL: res.largeImageURL,
        tags: res.tags,
      };
    });
  };

  handelSubmit = data => {
    this.setState({ submitValue: data, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  visibleLoadButton = () => {
    const { cards } = this.state;
    const visible = cards.length < 12 ? false : true;
    return visible;
  };

  togleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleModal = idImg => {
    const { cards } = this.state;
    const modalImg = cards.filter(card => idImg === card.id);
    this.setState({ modalImg: modalImg });

    this.togleModal();
  };

  isSuccessfulSerch = () => {
    const { cards } = this.state;
    return cards.length <= 0 ? true : false;
  };

  render() {
    const { cards, isLoading, showModal, modalImg } = this.state;
    const visible = this.visibleLoadButton();
    const isSuccessfulSerch = this.isSuccessfulSerch();

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handelSubmit} />
        <ImageGallery cards={cards} handleModal={this.handleModal} />
        {isLoading && <Loader />}
        {isSuccessfulSerch && <Message {...this.state} />}
        {visible && <Button onClick={this.onLoadMore} isLoading={isLoading} />}
        {showModal && <Modal modalImg={modalImg} onClose={this.togleModal} />}
      </AppContainer>
    );
  }
}
export default App;
