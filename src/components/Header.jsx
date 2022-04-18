import React from 'react';
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
      <header data-testid="header-component">
        {loading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">{object.name}</p>
        )}
      </header>
    );
  }
}

export default Header;
