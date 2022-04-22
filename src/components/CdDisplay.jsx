import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CdDisplay.module.css';

class CdDisplay extends React.Component {
  render() {
    // Recebe as props (com as devidas validações) do componente Pai e renderiza na página no formato apresentado no retorno
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = this.props;
    return (
      <div className={ styles.container }>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h4>{collectionName}</h4>
        <h4>{artistName}</h4>
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
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default CdDisplay;
