import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components /Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components /MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const teste = await getMusics(id);

    this.setState(
      { musicas: teste,
      },
    );
  }

  render() {
    const { musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />

        { musicas && (
          <div>
            <h1 data-testid="artist-name">{musicas[0].artistName}</h1>
            <img src={ musicas[0].artworkUrl100 } alt={ musicas[0].collectionName } />
            <h3 data-testid="album-name">
              {musicas[0].collectionName}
            </h3>
            {musicas.filter((_retorno, index) => index !== 0).map((retorno, index) => (
              <div key={ index }>
                <MusicCard
                  trackName={ retorno.trackName }
                  previewUrl={ retorno.previewUrl }
                  trackId={ retorno.trackId }

                />
              </div>
            )) }
          </div>
        )}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
