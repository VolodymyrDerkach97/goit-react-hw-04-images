import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ cards, handleModal }) => {
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
};

export default ImageGallery;

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
