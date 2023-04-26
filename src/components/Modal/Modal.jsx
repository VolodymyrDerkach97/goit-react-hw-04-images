import { useEffect } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const portalModal = document.querySelector('#root-modal');

const Modal = ({ largeImageURL, tags, onClose }) => {
  const onCloseOverlay = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const onCloseKey = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseKey);
    return () => window.removeEventListener('keydown', onCloseKey);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onCloseOverlay}>
      <ModalStyled>
        <img src={largeImageURL} alt={tags} />
      </ModalStyled>
    </Overlay>,
    portalModal
  );
};

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
