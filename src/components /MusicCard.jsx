import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicas } = this.props;
    return (
      <div>
        {musicas.filter((retorno, index) => index !== 0).map((retorno, index) => (
          <div key={ index }>
            <h2>{retorno.trackName}</h2>
            <audio data-testid="audio-component" src={ retorno.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musicas: PropTypes.arrayOf(PropTypes.string).isRequired,
};
