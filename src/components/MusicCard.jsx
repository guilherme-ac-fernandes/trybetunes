import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import styles from './MusicCard.module.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // Estado que recebe a informação do usuário
      loading: false,
      // Estado que armazena a informação se a música em questão é favorita ou não
      checked: false,
    };
  }

  // A função será executado no mesmo momento do componente DidMount
  componentDidMount() {
    this.favoriteSaved();
  }

  // Função que avalia se a música em questão é favorita e atualiza no estado, onde tais informações (ID e array contendo as músicas recebida é realizada por props)
  favoriteSaved = async () => {
    const { trackId, favoriteSongs } = this.props;
    const isFavorite = favoriteSongs.some((fav) => fav === trackId);
    // Atualização do estado
    this.setState({
      checked: isFavorite,
    });
  }

  // Função que realiza as alterações no LocalStorage (que imita a funcionalidade de uma API), na adição e remoção de músicas
  handleChange = async (songObject) => {
    const { checked } = this.state;
    // Condicional: se o estado for falso, a música é adicionada no LocalStorage
    if (!checked) {
      // Adição de uma música as favoritas de forma assíncrona e em cascata (o segundo parâmetro de setState garante a sequência correta das operações)
      this.setState({
        loading: true,
      }, async () => {
        await addSong(songObject);
        this.setState({
          loading: false, // Remove o carregamento da página
          checked: true, // Altera o estado para música favorita
        });
      });
    } else {
      // Caso contrário, remove música das favoritas
      const { favoriteSection, getFavorite } = this.props; // Está validação e função são provientes da página contendo todas as músicas favoritas. Se a música estiver nesta seção (informação booleana presente no favoriteSection) for desta página a função getFavorite é chamada atualizando o localStorage com a remoção e nova renderização da página de músicas favoritas
      this.setState({
        loading: true, // Colocar o carregamento na página até que o retorno da promise seja resolvido
      }, async () => {
        await removeSong(songObject); // Remove a música do LocalStorage
        if (favoriteSection) { // Se for da página de favoritas, força um renderização
          await getFavorite(); // Função que força a renderização através da busca por uma nova promise que atualiza o estado no componente pai
        }
        this.setState({
          loading: false, // Remove o carregamento da página
          checked: false, // Remove estado para música favorita para falso
        });
      });
    }
  }

  render() {
    // Informação que será renderizadas para cada música na página
    const { trackName, previewUrl, trackId } = this.props;
    // Estados que serão capazes de realizar as comportamentos necessários da página
    const { loading, checked } = this.state;
    return (
      <section className={ styles.container }>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <section>
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
            </section>
          )}
        </div>

      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.number).isRequired,
  favoriteSection: PropTypes.bool.isRequired,
  getFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
