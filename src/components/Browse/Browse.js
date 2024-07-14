import React from 'react'
import Header from '../Header/Header'
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies'
import MainContainer from '../container/MainContainer';
import SecondaryContainer from '../container/SecondaryContainer';

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {
        /* 
        Main Container
          Video Background
          video title
        Secondary Container
          Movies list * n
            cards * n

        */
      }
    </div>
  )
}

export default Browse