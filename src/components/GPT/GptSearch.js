import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { NETFLIX_BACKGROUND } from '../../constant/constant';

const GptSearch = () => {
    return (
        <div>
            <div className='fixed -z-10'>
                <img alt='background' src={NETFLIX_BACKGROUND} />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearch;
