import React from 'react'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(store=> store?.movies?.nowPlayingMovies)
  return (
    <div>SecondaryContainer</div>
  )
}

export default SecondaryContainer