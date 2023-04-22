import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormbButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

import { AiOutlineSearch } from 'react-icons/ai';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handelChange = e => {
    this.setState({ searchValue: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchValue);
    this.reset();
  };

  reset = () => {
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Header className="searchbar">
        <SearchForm className="form" onSubmit={this.handleSubmit}>
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
            onChange={this.handelChange}
            value={this.state.searchValue}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
