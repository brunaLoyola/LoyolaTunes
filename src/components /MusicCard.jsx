import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Message from './Message';
import '../css/musicCard.css'; // Certifique-se de importar o CSS

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      iniciando: true,
      carregando: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favoritas = await getFavoriteSongs();
    const { trackId } = this.props;
    const isChecked = favoritas.some((retorno) => retorno === trackId);
    this.setState({
      isChecked,
      iniciando: false,
    });
  };

  checkFavorite = async ({ target }) => {
    const { trackId } = this.props;

    this.setState({ carregando: true });

    await addSong(trackId);
    this.setState({
      isChecked: target.checked,
      carregando: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, carregando, iniciando } = this.state;
    return (
      <div className="music-card">
        { iniciando ? <Message className="loading-message" />
          : (
            <div className="music-card-container">
              <div className="music-card-content">
                <h2>{trackName}</h2>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                { !carregando ? (
                  <label
                    htmlFor={ `checkbox-music-${trackId}` } // Ajuste para ID correto
                  >
                    Favorita
                    <input
                      data-testid={ `checkbox-music-${trackId}` }
                      type="checkbox"
                      checked={ isChecked }
                      onChange={ this.checkFavorite }
                    />
                  </label>
                ) : <Message className="loading-message" />}
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
