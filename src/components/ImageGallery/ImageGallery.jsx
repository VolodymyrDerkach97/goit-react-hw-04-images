import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { cards, handleModal } = this.props;
    return (
      <ImageGalleryList>
        {cards.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            bigImg={largeImageURL}
            alt={tags}
            id={id}
            handleModal={handleModal}
          />
        ))}
      </ImageGalleryList>
    );
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  handleModal: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
