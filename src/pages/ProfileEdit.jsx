import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.updateUserInfo();
  }

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

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    const updatedUser = { name, email, image, description };
    this.setState({
      loading: true,
    }, async () => {
      await updateUser(updatedUser);
      // Não precisei colocar um loading para false porque já altera a página
      const { history } = this.props;
      history.push('/profile');
    });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    const validation = {
      name: name.length > 0,
      email: email.length > 0,
      // Resolução para verificação do email proveniente do exercício realizado durante o bloco 11 (link: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/02-front-end/bloco-11-componentes-com-estado-eventos-e-formularios-com-react/dia-02-formularios-no-react/exercise-01/src/App.jsx)
      // Onde, [^\s@] sigifica qualquer string
      // A verificação é feita por: anystring@anystring.anystring
      // !! foi correção do linter ao aplicar um ternário
      emailString: (!!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
      image: image.length > 0,
      description: description.length > 0,
    };
    const buttonDisabled = Object.values(validation).every((item) => item === true);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
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
