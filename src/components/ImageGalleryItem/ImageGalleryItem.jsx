import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ data, toggleModal }) => {
  return data.map(el => (
    <li
      className="ImageGalleryItem-image"
      key={el.id}
      onClick={() => toggleModal(el.largeImageURL, el.tags)}
    >
      <img src={el.webformatURL} alt={el.tags} />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  data: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
