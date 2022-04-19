import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      music: [],
      artist: '',
      collection: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const objectMusic = await getMusics(id);
    const cd = (objectMusic.filter((_, index) => index === 0))[0];
    const songs = objectMusic.filter((_, index) => index !== 0);
    this.setState({
      music: songs,
      artist: cd.artistName,
      collection: cd.collectionName,
    });
  }

  render() {
    const { music, artist, collection } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artist}</h2>
        <h3 data-testid="album-name">{collection}</h3>
        {music.map((song, index) => <MusicCard key={ index } { ...song } />)}
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
