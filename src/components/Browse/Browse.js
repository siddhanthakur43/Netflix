import React from 'react'
import Header from '../Header/Header'
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies'
import MainContainer from '../container/MainContainer';
import SecondaryContainer from '../container/SecondaryContainer';
import useTopRatedMovies from '../../hooks/useTopRatedMovies';
import GptSearch from '../GPT/GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const isGpt = useSelector(store => store.gpt.showGptSearch)
  useNowPlayingMovies();
  useTopRatedMovies();
  return (
    <div>
      <Header />
      {
        isGpt ?
          ( <GptSearch /> ) : (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )
      }
    </div>
  )
}

export default Browse