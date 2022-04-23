import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './ProfileEdit.module.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true, // Estado que recebe a informação do usuário
      name: '', // Estado que contém os dados do input name
      email: '', // Estado que contém os dados do input email
      image: '', // Estado que contém os dados do input image
      description: '', // Estado que contém os dados do input description
    };
  }

  // A função será executado no mesmo momento do componente DidMount
  componentDidMount() {
    this.updateUserInfo();
  }

  // Função genérica que lida com as informações do formulário
  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  // Função que atualiza os dados do usuário no LocalStorage, faz o gerenciamento do carregamento e atualizada o estado (antes da página ser renderizada, porque é chamado no componenteDidMount)
  updateUserInfo = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const userObject = await getUser();
      this.setState({
        loading: false,
        name: userObject.name,
        email: userObject.email,
        image: userObject.image,
        description: userObject.description,
      });
    });
  }

  // Função a ser executada ao clicar no botão
  handleClick = async () => {
    // Recebe os dados do usuário do estado e cria um objeto
    const { name, email, image, description } = this.state;
    const updatedUser = { name, email, image, description };
    // Abaixo contém : o gerenciamento do carregamento, a função que retorna uma promise contendo a atualização dos dados do usuário e o redirect para a página de profile
    this.setState({
      loading: true,
    }, async () => {
      await updateUser(updatedUser);
      // Observação: Não precisei colocar um loading para false porque já altera a página
      const { history } = this.props;
      history.push('/profile');
    });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    // Constante contendo todas as validações dos inputs
    const validation = {
      name: name.length > 0,
      email: email.length > 0,
      // Resolução para verificação do email proveniente do exercício realizado durante o bloco 11 (link: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/02-front-end/bloco-11-componentes-com-estado-eventos-e-formularios-com-react/dia-02-formularios-no-react/exercise-01/src/App.jsx)
      // Onde, [^\s@] sigifica qualquer string
      // ^ e $ = no começo e no final, respectivamente
      // \s = encontra correspondência com um único caractere de espaço em branco
      // @ = engloba todos os caracteres comuns
      // \. = \ remove a expressão do ponto porque o ponto significa qualquer caracter
      // A verificação é feita por: anystring@anystring.anystring
      // !! foi correção do linter ao aplicar um ternário => Operação que converte um thuthy ou falsy em true ou false
      emailString: (!!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
      image: image.length > 0,
      description: description.length > 0,
    };
    // Constante que recebe valores booleanos, se todos as validações no objeto acima forem true o botão é habilitado
    const buttonDisabled = Object.values(validation).every((item) => item === true);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <section className={ styles.container }>
          {loading ? (
            <aside><Loading /></aside>
          ) : (
            <div>
              <label htmlFor="edit-input-image">
                <h3>Imagem</h3>
                <input
                  type="text"
                  name="image"
                  value={ image }
                  id="edit-input-image"
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-name">
                <h3>Nome</h3>
                <input
                  type="text"
                  name="name"
                  value={ name }
                  id="edit-input-name"
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-email">
                <h3>E-mail</h3>
                <input
                  type="text"
                  name="email"
                  value={ email }
                  id="edit-input-email"
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-description">
                <h3>Descrição</h3>
                <input
                  type="text"
                  name="description"
                  value={ description }
                  id="edit-input-description"
                  data-testid="edit-input-description"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ !buttonDisabled }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
