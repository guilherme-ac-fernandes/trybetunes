import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favorite: [],
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    const favoriteArray = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorite: favoriteArray,
    });
  }

  render() {
    const { loading, favorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <>
            {favorite.map((fav, index) => (<MusicCard
              key={ `fav${index}` }
              trackId={ Number(fav.trackId) }
              trackName={ fav.trackName }
              previewUrl={ fav.previewUrl }
              favoriteSection
              getFavorite={ this.getFavorite }
              favoriteSongs={ favorite.map((favId) => Number(favId.trackId)) }
            />))}
          </>
        )}
      </div>
    );
  }
}

export default Favorites;
