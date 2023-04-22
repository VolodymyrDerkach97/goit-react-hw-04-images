import { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const portalModal = document.querySelector('#root-modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseKey);
  }

  onCloseKey = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { modalImg } = this.props;
    const [{ largeImageURL, tags }] = modalImg;
    return createPortal(
      <Overlay onClick={this.onCloseOverlay}>
        <ModalStyled>
          <img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </Overlay>,
      portalModal
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImg: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
