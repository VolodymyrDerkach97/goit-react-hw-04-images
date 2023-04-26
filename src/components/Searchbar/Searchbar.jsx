import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormbButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

import { AiOutlineSearch } from 'react-icons/ai';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchValue);
    reset();
  };

  const reset = () => {
    setSearchValue('');
  };

  return (
    <Header className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <AiOutlineSearch size={25} />
          <SearchFormbButtonLabel className="button-label">
            Search
          </SearchFormbButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          name="searchValue"
          autoComplete="off"
          onChange={({ target: { value } }) => setSearchValue(value)}
          value={searchValue}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
