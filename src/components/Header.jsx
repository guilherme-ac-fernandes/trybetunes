import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      object: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const objectUser = await getUser();
    this.setState({
      loading: false,
      object: objectUser,
    });
  }

  render() {
    const { object, loading } = this.state;
    return (
      <>
        <header data-testid="header-component">
          {loading ? (
            <Loading />
          ) : (
            <p data-testid="header-user-name">{object.name}</p>
          )}
        </header>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorite</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </>
    );
  }
}

export default Header;
