import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleChange = async (songObject) => {
    this.setState({
      loading: true,
    });
    await addSong(songObject);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId, favoriteSongs } = this.props;
    const { loading } = this.state;
    const isFavorite = favoriteSongs.find((fav) => fav.trackId === trackId);
    return (
      <div>
        { loading && <Loading />}
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.handleChange(this.props) }
            checked={ isFavorite }
          />
        </label>
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // Solução para propType de array de objeto com várias chaves proveniente do LifeSaver (link: https://lifesaver.codes/answer/prop-type-object-if-forbidden-react-forbid-prop-types)
  favoriteSongs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

export default MusicCard;
