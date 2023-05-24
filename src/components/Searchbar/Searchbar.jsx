import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  function hedleSubmit(e) {
    e.preventDefault();
    onSubmit(e.target[1].value);
  }
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={hedleSubmit}>
        <button type="submit" className="SearchForm-button">
          <ImSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
