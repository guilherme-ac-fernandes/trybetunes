import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artist } = this.state;
    const loginMinLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Which artist do you want to search?"
            name="artist"
            value={ artist }
            onChange={ this.handleChange }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < loginMinLength }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
