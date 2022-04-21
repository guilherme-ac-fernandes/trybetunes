import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      // Estado que recebe a informação do usuário (inicia como true porque espera o recebimento da promise para desaparecer)
      loading: true,
      // Objeto no estado para armazenar os dados do usuário
      user: {},
    };
  }

  // A função será executado no mesmo momento do componente DidMount
  componentDidMount() {
    this.getUserInfo();
  }

  // Função recebe os dados do usuário, faz o gerenciamento do carregamento e atualiza o objeto no estado
  getUserInfo = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const userObject = await getUser();
      this.setState({
        user: userObject,
        loading: false,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <h3>Nome</h3>
            <p>{user.name}</p>
            <h3>E-mail</h3>
            <p>{user.email}</p>
            <h3>Descrição</h3>
            <p>{user.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}

      </div>
    );
  }
}

export default Profile;
