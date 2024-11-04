import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components /Header';
import Message from '../components /Message';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      isDisabled: true,
      isClick: false,
      isSearch: false,
      album: [],
    };
  }

  validacao = () => {
    const { artista } = this.state;
    const valorTeste = 2;
    if (artista.length < valorTeste) {
      return this.setState({ isDisabled: true });
    }
    this.setState({ isDisabled: false });
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artista: value,
    }, this.validacao);
  };

  searchButtonClick = async () => {
    const { artista } = this.state;
    this.setState({ isClick: true });
    const al = await searchAlbumsAPI(artista);
    this.setState({ album: al, isClick: false, isSearch: true });
  };

  render() {
    const { isDisabled, isClick, album, artista, isSearch } = this.state;
    return (
      <div id="page-search">
        <Header />
        {!isClick ? (
          <div className="search-form">
            <label htmlFor="search-artist-input">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                onChange={ this.onInputChange }
              />
            </label>
            <button
              disabled={ isDisabled }
              data-testid="search-artist-button"
              onClick={ this.searchButtonClick }
            >
              Pesquisar
            </button>
          </div>
        ) : (
          <Message />
        )}
        {album.length !== 0 && isSearch ? (
          <div className="results">
            <p className="results-title">
              Resultado de álbuns de:
              {' '}
              {artista}
            </p>
            {album.map((retorno, index) => (
              <div className="album-card" key={ index }>
                <img src={ retorno.artworkUrl100 } alt={ retorno.collectionName } />
                <h2>{retorno.collectionName}</h2>
                <p>{retorno.artistName}</p>
                <Link
                  data-testid={ `link-to-album-${retorno.collectionId}` }
                  to={ `/album/${retorno.collectionId}` }
                >
                  <h3>+</h3>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          isSearch && <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}

export default Search;
