import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Message from './Message';

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
      <div>
        { iniciando ? <Message />

          : (
            <div>
              <h2>{trackName}</h2>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              { !carregando ? (
                <label
                  htmlFor="checkboxMusic"
                >
                  Favorita
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    checked={ isChecked }
                    onChange={ this.checkFavorite }
                  />
                </label>
              ) : <Message />}
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
