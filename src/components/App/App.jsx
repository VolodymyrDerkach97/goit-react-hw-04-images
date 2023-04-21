import { Component } from 'react';
// import { Main } from './App.styled';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';

import pixabayFetch from '../../services/pixabay-api';

class App extends Component {
  state = {
    cards: [],
    submitValue: '',
    page: 1,
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { submitValue, page } = this.state;
    if (submitValue !== prevState.submitValue) {
      this.setState({ isLoading: true, page: 1 });
      try {
        const response = await pixabayFetch(submitValue, page);

        this.setState({ cards: [...response] });
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

        this.setState(prevState => {
          return {
            cards: [...prevState.cards, ...response],

            isLoading: 'resolved',
          };
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

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

  isCompleteSerch = () => {
    const { cards } = this.state;
    return cards.length <= 0 ? true : false;
  };

  inSearchMessage = submitValue => {
    if (this.state.submitValue !== '') {
      return <div>Нажаль ми нічого не знайшли за запитом {submitValue}</div>;
    }
    return <div>Заповніть поле пошуку</div>;
  };
  render() {
    const { cards, isLoading, submitValue } = this.state;
    const visible = this.visibleLoadButton();
    const isCompleteSerch = this.isCompleteSerch();
    const searchMessage = this.inSearchMessage(submitValue);

    return (
      <>
        <Searchbar onSubmit={this.handelSubmit} />
        <ImageGallery cards={cards} />

        {isLoading && <Loader />}
        {visible && <Button onClick={this.onLoadMore} />}
        {isCompleteSerch && searchMessage}
      </>
    );
  }
}
export default App;
