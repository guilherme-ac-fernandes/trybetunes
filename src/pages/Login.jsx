import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { login } = this.state;
    const { createUser, history } = this.props;
    const user = { name: login };
    this.setState({ loading: true }, async () => {
      await createUser(user);
      history.push('/search');
    });
  }

  render() {
    const { login, loading } = this.state;
    const loginMinLength = 3;

    return (
      <section>
        {loading ? (
          <Loading />
        ) : (
          <div data-testid="page-login">
            <label htmlFor="login-name-input">
              Login:
              <input
                id="login-name-input"
                type="text"
                data-testid="login-name-input"
                placeholder="Name"
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
          </div>)}
      </section>
    );
  }
}

Login.propTypes = {
  createUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
