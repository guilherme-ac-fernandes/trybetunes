import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      // Array que contém todas as músicas do artista/banda
      music: [],
      // Nome do artista/banda
      artist: '',
      // Nome do disco
      collection: '',
      // Estado que gerenciona o carregamento na tela
      loading: true,
      // Array que contém apenas as músicas favoritadas
      favoriteSongs: [],
    };
  }

  // A função será executado no mesmo momento do componente DidMount
  componentDidMount() {
    this.handleChangeFromSimulationAPI();
  }

  // Função que recebe as informações do disco do artista/banda
  handleChangeFromSimulationAPI = async () => {
    // Props criada pelo componente Route que contém a informação presente na URL
    const { match: { params: { id } } } = this.props;
    // Retorno da API que contém as informações do disco
    const objectMusic = await getMusics(id);
    // O primeiro elemento do array retornado pela API é as informações do disco, essa constante filtra apenas esse elemento
    const cd = (objectMusic.filter((_, index) => index === 0))[0];
    // Os demais elementos do array retornado da API são todas as músicas presentes. A constante abaixo filtra removendo apenas o primeiro elemento do array
    const songs = objectMusic.filter((_, index) => index !== 0);
    this.setState({
      music: songs, // Adiciona no estado todas as músicas do disco em questão
      artist: cd.artistName, // Atualização do estado que contém o nome do artista
      collection: cd.collectionName, // Atualização do estado que contém o nome do disco
    });
    // Recuperação das músicas favoritas no LocalStorage
    const favorite = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: favorite, // Atualiza o array de músicas favoritas
    });
  }

  // Função sem necessidade operacional, apenas para corrigir problemas com o linter e a reutilização deste componente
  getFavorite = () => {};

  render() {
    const { music, artist, collection, loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <>
            <h2 data-testid="artist-name">{artist}</h2>
            <h3 data-testid="album-name">{collection}</h3>
            {music.map((song, index) => (<MusicCard
              key={ index }
              { ...song }
              favoriteSection={ false }
              getFavorite={ this.getFavorite }
              favoriteSongs={ favoriteSongs.map((fav) => Number(fav.trackId)) }
            />))}
            {/* A aplicação da função Number() é para corrigir o retorno encontrado na validação do PropTypes pelos dados provenientes do teste - Estava retornado number e string */}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Album;
