import PropTypes from 'prop-types';

export const ImageGallery = props => {
  return <ul className="ImageGallery">{props.children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
