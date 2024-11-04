import React from 'react';
import PropTypes from 'prop-types';
import Message from '../components /Message';
import capa from '../img/capa.png';
import '../css/index.css';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: { name: '',
        email: '',
        image: '',
        description: '' },
      isDisabled: true,
      logado: false,

    };
  }

  validacao = () => {
    const { user } = this.state;
    const valorTeste = 3;
    if (user.name.length < valorTeste) {
      return this.setState({ isDisabled: true });
    }
    this.setState({ isDisabled: false });
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      user: { name: value },
    }, this.validacao);
  };

  onSaveButtonClick = async () => {
    const {
      user,
    } = this.state;

    this.setState({ logado: true }, async () => {
      await createUser(user);
      const { history } = this.props;
      history.push('/search', this.state);
    });
  };

  render() {
    const { isDisabled, logado } = this.state;
    return (
      <div>
        {
          logado ? <Message />
            : (
              <div data-testid="page-login">
                <img src={ capa } alt="Logo da Lyric Lounge" />
                <h4>Digite seu nome</h4>
                <label htmlFor="">
                  <input
                    type="text"
                    data-testid="login-name-input"
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  className="button-enter"
                  data-testid="login-submit-button"
                  disabled={ isDisabled }
                  onClick={ this.onSaveButtonClick }
                >
                  Entrar

                </button>
              </div>
            )
        }
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
