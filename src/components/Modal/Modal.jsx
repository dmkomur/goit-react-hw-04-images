import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ toggleModal, img, alt }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        toggleModal('', '');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal('', '');
    }
  };

  return (
    <div className="Overlay" onClick={onBackdropClick}>
      <div className="Modal">
        <img src={img} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
