import { Component } from 'react';
// import { Main } from './App.styled';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import { ThreeDots } from 'react-loader-spinner';

import pixabayFetch from '../../services/pixabay-api';

class App extends Component {
  state = {
    cards: [],
    submitValue: '',
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { submitValue, page } = this.state;
    if (submitValue !== prevState.submitValue) {
      this.setState({ isLoading: true });
      try {
        const response = await pixabayFetch(submitValue, page);

        this.setState({ cards: [...response] });
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
    this.setState({ submitValue: data });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  visibleLoadButton = () => {
    const { cards } = this.state;
    const visible = cards <= 12 ? false : true;
    return visible;
  };
  render() {
    const { cards, isLoading } = this.state;
    const visible = this.visibleLoadButton();
    return (
      <>
        <Searchbar onSubmit={this.handelSubmit} />
        <ImageGallery cards={cards} />
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {visible && <Button onClick={this.onLoadMore} />}
      </>
    );
  }
}
export default App;
