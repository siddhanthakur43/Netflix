import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const SecondaryContainer = () => {
  const movies = useSelector(store => store?.movies)
  return (
    <div className='bg-[#141414]'>
      <div className='-mt-52 relative z-30'>
      <MovieList movies={movies?.nowPlayingMovies} title={"Now Playing"} />
      <MovieList movies={movies?.topRatedMovies} title={"Top Rated"} />
      <MovieList movies={movies?.nowPlayingMovies} title={"Trending"} />
      <MovieList movies={movies?.nowPlayingMovies} title={"Horror"} />
    </div>
    </div>
    
  )
}

export default SecondaryContainer