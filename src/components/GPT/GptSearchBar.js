import React, { useRef } from 'react'
import lang from '../../utils/languageConstant';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../../utils/openai';
import { API_OPTIONS } from '../../constant/constant';
import { addGptMovieResult } from '../../utils/gptSlice';

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.appConfig.preferredLanguage);
    const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);

        //Make api call to gpt api and get result
        const gptQuery =
            "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });
        if (!gptResults.choices) {
            //Error
        }
        console.log(gptResults.choices?.[0]?.message?.content);
            // Andaz apna apna, phir hera pheri,Chupke chupke
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(',');
            // [Andaz apna apna, Phir hera pheri, Chupke chupke]
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
            // it will return the promise as it is async function
        // [Promise, Promise, Promise, Promise, Promise]
        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );

    }
    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='bg-black w-1/2 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    className='p-4 m-4 col-span-9'
                    type='text'
                    placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className='px-4 py-2 m-4 bg-red-700 text-white rounded-md col-span-3'
                    onClick={handleGptSearchClick}>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
