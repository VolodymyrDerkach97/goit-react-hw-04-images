import { Component } from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
class ImageGalleryItem extends Component {
  state = {
    indexModal: null,
  };

  handleClick = e => {
    const { id, handleModal } = this.props;

    handleModal(id);
  };

  render() {
    const { smallImg, alt } = this.props;
    return (
      <GalleryItem>
        <GalleryImage src={smallImg} alt={alt} onClick={this.handleClick} />
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;
