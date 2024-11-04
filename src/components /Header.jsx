import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../css/header.css';
import Message from './Message';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      aguardando: true,
      usuario: '',
    };
  }

  componentDidMount() {
    this.nomeUsu();
  }

  nomeUsu = async () => {
    const getName = await getUser();
    this.setState({ aguardando: false,
      usuario: getName.name });
  };

  render() {
    const { aguardando, usuario } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          <div>
            <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favoritas </Link>
            <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
          </div>
          { aguardando ? <Message />
            : (
              <div className="user-name" data-testid="header-user-name">
                { usuario }
              </div>
            )}
        </header>
      </div>
    );
  }
}

export default Header;
