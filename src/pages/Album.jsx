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
      music: [],
      artist: '',
      collection: '',
      loading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.handleChangeFromSimulationAPI();
  }

  handleChangeFromSimulationAPI = async () => {
    // Busca da informação do album selecionado
    const { match: { params: { id } } } = this.props;
    const objectMusic = await getMusics(id);
    const cd = (objectMusic.filter((_, index) => index === 0))[0];
    const songs = objectMusic.filter((_, index) => index !== 0);
    this.setState({
      music: songs,
      artist: cd.artistName,
      collection: cd.collectionName,
    });
    // Recuperação das músicas favoritas
    const favorite = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: favorite,
    });
  }

  render() {
    const { music, artist, collection, loading, favoriteSongs } = this.state;
    // console.log(favoriteSongs.map((fav) => fav.trackId));
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
              favoriteSongs={ favoriteSongs.map((fav) => fav.trackId) }
            />))}
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
