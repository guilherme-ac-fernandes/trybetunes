import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      // Estado que recebe a informação do usuário
      object: {},
      // Estado que gerenciona o carregamento na tela
      loading: true,
    };
  }

  // A função será executado no mesmo momento do componente DidMount
  componentDidMount() {
    this.getUserInfo();
  }

  // Função que recebe uma promise (informação do usuário) e armazena a informação no estado
  getUserInfo = async () => {
    const objectUser = await getUser();
    this.setState({
      loading: false,
      object: objectUser,
    });
  }

  render() {
    const { object, loading } = this.state;
    // Componente Cabeçalho que engloba o nome do usuário e os link de navegação da aplicação em React
    return (
      <header data-testid="header-component">
        {loading ? (
          <Loading />
        ) : (
          // Elemento aonde o nome do usuário é informado
          <p data-testid="header-user-name">{object.name}</p>
        )}
        <nav>
          {/* Secão que contém a navegação da página */}
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorite</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
