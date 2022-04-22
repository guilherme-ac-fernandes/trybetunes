import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import styles from './Header.module.css';
import logo from '../image/logo-trybetunes-png.png';
import Perfil from './Perfil';

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
      <header data-testid="header-component" className={ styles.container }>
        <section>
          <img src={ logo } alt="logo TrybeTunes" />
          <div>
            {loading ? (
              <Loading />
            ) : (
            // Elemento aonde o nome do usuário é informado
              <div>
                <ul><Perfil /></ul>
                <p data-testid="header-user-name">{object.name}</p>
              </div>
            )}
          </div>
        </section>

        <nav>
          <ul>
            {/* Secão que contém a navegação da página */}
            <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
            <li><Link data-testid="link-to-favorites" to="/favorites">Favorite</Link></li>
            <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
