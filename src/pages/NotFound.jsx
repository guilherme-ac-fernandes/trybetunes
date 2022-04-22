import React from 'react';
import styles from './NotFound.module.css';
import logo from '../image/logo-trybetunes.svg';

class NotFound extends React.Component {
  render() {
    // Componente que contém os dados para uma página vazia ou não encontrada
    return (
      <div data-testid="page-not-found" className={ styles.container }>
        <img src={ logo } alt="logo TrybeTunes" />
        <section>
          <h1>Ops!</h1>
          <p>The page you are looking for was not found.</p>
        </section>
      </div>
    );
  }
}

export default NotFound;
