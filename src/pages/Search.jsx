import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import CdDisplay from '../components/CdDisplay';
import styles from './Search.module.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false, // Estado que recebe a informação do usuário
      artist: '', // Estado que contém os valores do input do artista/banda a ser pesquisado
      returnArrayCd: {}, // Estado contendo objeto para armazenar os disco do artista/banda
      result: false, // Estado que contém uma resposta true ou false do retorno da API para mostrar ou não na página
      searchInfo: '', // Estado que recebe o nome do artista/banda para ser salvo mesmo limpando o input
      notValid: false, // Estado que contém uma resposta true ou false se tomando do array retornado da API for não conter elementos, mostrando que 'Nenhum álbum foi encontrado'
    };
  }

  // Função genérica que lida com as informações do formulário
  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  // Função a ser executada ao clicar no botão
  handleClick = async () => {
    this.setState({ loading: true }); // Inicia o carregamento na página
    const { artist } = this.state; // Constante que armazena o artista/banda pesquisado
    const arrayCds = await searchAlbumsAPI(artist); // Recebe a promise contendo dos discos do artista informado no input
    if (arrayCds.length > 0) { // Se o array retornado pela API contém elementos
      this.setState({
        artist: '', // Limpeza do input
        loading: false, // Remove o carregamento da página
        returnArrayCd: arrayCds, // Atualiza o array de discos
        result: true, // Informa que os dados foram válidos e que pode ser renderizado
        searchInfo: artist[0].toUpperCase() + artist.slice(1), // Armazena o nome do artista/banda pesquisada
        notValid: false, // Mantém o estado de validação como false
      });
    } else { // Caso contrário (array não conter elementos)
      this.setState({
        artist: '', // Limpeza do input
        loading: false, // Remove o carregamento da página
        notValid: true, // Informa que os dados são inválidos e renderiza a mensagem que não há nenhum álbum
      });
    }
  }

  render() {
    const { artist, loading, returnArrayCd, result, searchInfo, notValid } = this.state;
    const loginMinLength = 2; // Constante que armazena o número minímo de caracteres no input artist para habilitar o botão de pesquisa
    return (
      <div data-testid="page-search">
        <Header />
        <main className={ styles.container }>
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
              <aside><Loading /></aside>
            ) }
          </div>
          {result && (
            <section>
              <p>{`Resultado de álbuns de: ${searchInfo}`}</p>
              <div>
                {returnArrayCd.map((cd) => (<CdDisplay
                  key={ cd.collectionId }
                  { ...cd }
                />))}
              </div>
            </section>
          )}
          <div>{notValid && <p>Nenhum álbum foi encontrado</p>}</div>

        </main>

      </div>
    );
  }
}

export default Search;
