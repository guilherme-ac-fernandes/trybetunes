import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import CdDisplay from '../components/CdDisplay';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      loading: false,
      returnArrayCd: {},
      result: false,
      searchInfo: '',
      notValid: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const { artist } = this.state;
    const arrayCds = await searchAlbumsAPI(artist);
    if (arrayCds.length > 0) {
      this.setState({
        artist: '',
        loading: false,
        returnArrayCd: arrayCds,
        result: true,
        searchInfo: artist,
        notValid: false,
      });
    } else {
      this.setState({
        artist: '',
        loading: false,
        notValid: true,
      });
    }
  }

  render() {
    const { artist, loading, returnArrayCd, result, searchInfo, notValid } = this.state;
    const loginMinLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {!loading ? (
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
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          ) : (
            <Loading />
          ) }
        </div>
        {result && (
          <section>
            <p>{`Resultado de álbuns de: ${searchInfo}`}</p>
            <div>
              {returnArrayCd.map((cd) => <CdDisplay key={ cd.collectionId } { ...cd } />)}
            </div>
          </section>
        )}
        <div>{notValid && <p>Nenhum álbum foi encontrado</p>}</div>
      </div>
    );
  }
}

export default Search;
