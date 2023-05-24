import PropTypes from 'prop-types';

export const Button = ({ handleClick }) => {
  return (
    <button type="button" className="Button" onClick={handleClick}>
      Load more
    </button>
  );
};
Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
