import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import logo from '../image/logo-trybetunes.svg';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '', // Estado que lida com as informaçõe no input login
      loading: false, // Estado que gerenciona o carregamento na tela
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

  // Função acionado ao clicar no botão
  handleClick = () => {
    // Recebe o nome do estado e cria um objeto obtendo contendo name como a chave do valor de login
    const { login } = this.state;
    const user = { name: login };
    // Props criada pelo componente Route que contém funções, uma dela (push) possibilita realizar um redirect para outra página
    const { history } = this.props;
    this.setState({
      loading: true, // Inicia o carregamento na tela
    }, async () => {
      await createUser(user); // Aguarda o retorna da função que cria as informações do usuário no LocalStorage
      history.push('/search'); // Redirect para página de search
    });
  }

  render() {
    const { login, loading } = this.state;
    const loginMinLength = 3; // Constante que armazena o número minímo de caracteres no input login para habilitar o botão
    return (
      <section>
        <img src={ logo } alt="logo TrybeTunes" />
        <section>
          {loading ? (
            <Loading />
          ) : (
            <form data-testid="page-login">
              <label htmlFor="login-name-input">
                <input
                  id="login-name-input"
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Username"
                  name="login"
                  value={ login }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ login.length < loginMinLength }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>)}
        </section>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
