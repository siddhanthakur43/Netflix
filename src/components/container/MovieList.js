import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ movies, title }) => {
    return (
        <div className='px-6'>
            <h1 className='text-3xl py-4 text-white'>{title}</h1>
            <div className='flex overflow-x-scroll'>
                <div className='flex'>
                    {
                        movies?.map(movie => <MovieCard movie={movie} key={movie.id} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default MovieList