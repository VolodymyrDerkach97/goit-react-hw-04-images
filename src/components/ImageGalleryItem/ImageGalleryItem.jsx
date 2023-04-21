import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImg, alt }) => {
  return (
    <GalleryItem>
      <GalleryImage src={smallImg} alt={alt} />
    </GalleryItem>
  );
};
export default ImageGalleryItem;
