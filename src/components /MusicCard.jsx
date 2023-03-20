import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Message from './Message';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      isChecked: false,
    };
  }

  getFavorite = async () => {
    const { trackId } = this.props;

    this.setState({ carregando: true });

    await addSong(trackId);
    this.setState({
      isChecked: true,
      carregando: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, carregando } = this.state;
    return (
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
              onChange={ this.getFavorite }
            />
          </label>
        ) : <Message />}
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
