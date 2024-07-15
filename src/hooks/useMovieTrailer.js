import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constant/constant";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo);
    const getMovieVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_OPTIONS)
        const json = await data.json()
        const filterdata = json?.results?.filter(video => video.name === 'Official Trailer');
        const trailer = filterdata.length ? filterdata[0] : json?.results[0];
        dispatch(addTrailerVideo(trailer));
    };
    useEffect(() => {
        !trailerVideo && getMovieVideo()
    }, []);
}

export default useMovieTrailer;