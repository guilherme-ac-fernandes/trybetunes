import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      // Estado que recebe a informação do usuário (inicia como true porque espera o recebimento da promise para desaparecer)
      loading: true,
      // Estado que contém as músicas favoritas
      favorite: [],
    };
  }

  // A função será executado no mesmo momento do componente DidMount
  componentDidMount() {
    this.getFavorite();
  }

  // Função que recupera as músicas presente no LocalStorage como músicas favoritas
  getFavorite = async () => {
    const favoriteArray = await getFavoriteSongs();
    this.setState({
      loading: false, // Remove o carregamento
      favorite: favoriteArray, // Atualiza o array de músicas favoritas
    });
  }

  render() {
    const { loading, favorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <>
            {favorite.map((fav, index) => (<MusicCard
              key={ `fav${index}` }
              trackId={ Number(fav.trackId) }
              trackName={ fav.trackName }
              previewUrl={ fav.previewUrl }
              favoriteSection
              getFavorite={ this.getFavorite }
              favoriteSongs={ favorite.map((favId) => Number(favId.trackId)) }
            />))}
            {/* A aplicação da função Number() é para corrigir o retorno encontrado na validação do PropTypes pelos dados provenientes do teste - Estava retornado number e string */}
          </>
        )}
      </div>
    );
  }
}

export default Favorites;
