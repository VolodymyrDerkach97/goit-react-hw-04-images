import { useState } from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import Modal from '../Modal';

const ImageGalleryItem = ({ smallImg, bigImg, alt }) => {
  const [showModal, setShowModal] = useState(false);

  const togleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <GalleryItem>
      <GalleryImage src={smallImg} alt={alt} onClick={togleModal} />
      {showModal && (
        <Modal tags={alt} largeImageURL={bigImg} onClose={() => togleModal()} />
      )}
    </GalleryItem>
  );
};

export default ImageGalleryItem;
