import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.favoriteSaved();
  }

  favoriteSaved = async () => {
    const { trackId, favoriteSongs } = this.props;
    const isFavorite = favoriteSongs.some((fav) => fav === trackId);
    this.setState({
      checked: isFavorite,
    });
  }

  handleChange = async (songObject) => {
    const { checked } = this.state;
    if (!checked) {
      // Adição de uma música das favoritas
      this.setState({
        loading: true,
      });
      await addSong(songObject);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      // Remove música das favoritas
      this.setState({
        loading: true,
      });
      await removeSong(songObject);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;

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
            checked={ checked }
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
  favoriteSongs: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
