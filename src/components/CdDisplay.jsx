import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CdDisplay extends React.Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    return (
      <div>
        <p>{`ID do Artista: ${artistId}`}</p>
        <p>{`Nome do Artista: ${artistName}`}</p>
        <p>{`ID do CD: ${collectionId}`}</p>
        <p>{`Nome do CD: ${collectionName}`}</p>
        <p>{`Preço do CD: ${collectionPrice}`}</p>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{`Data do lançamento: ${releaseDate}`}</p>
        <p>{`Número de faixas: ${trackCount}`}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Mostrar músicas
        </Link>
      </div>
    );
  }
}

CdDisplay.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};

export default CdDisplay;
