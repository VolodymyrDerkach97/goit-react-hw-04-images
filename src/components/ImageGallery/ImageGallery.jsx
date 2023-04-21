import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ cards }) => {
  return (
    <ImageGalleryList>
      {cards.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          bigImg={largeImageURL}
          alt={tags}
        />
      ))}
    </ImageGalleryList>
  );
};
export default ImageGallery;
