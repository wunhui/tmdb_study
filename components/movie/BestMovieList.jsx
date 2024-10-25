
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedMovies } from '@api/movie/main'
import useMovieStore from '@store/useMainStore';
import { useState } from "react";
import { QueryKeys } from "@constants/querys";

const MovieList = () => {
    const router = useRouter();
    const { categoryId } = useMovieStore();
    const [page, setPage] = useState(2)
    const { data: movieListData } = useQuery({
        queryKey: [...QueryKeys.BEST_MOVIE_QUERY, page],
        queryFn: ()  => fetchTopRatedMovies(page),
        keepPreviousData: true,
    }) 
    const handlePageCurrent = (value) => {
        setPage((prevPage) => {
            const newPage = prevPage + value;
            return newPage > 0 && newPage <= 32 ? newPage : prevPage
        })
        if( page === 1 ) {
            alert('첫번째 페이지입니다.')
        }  else if(page === 32) {
            alert('마지막 페이지입니다.')
        }
    }
    return (
        <div className="best_movie_wrap">
            <div className="top">
                <h2>최고의 영화</h2>
                <div className="btn_wrap">
                    <button onClick={() => handlePageCurrent(-1)}>{`<`}</button>
                    <button onClick={() => handlePageCurrent(1)}>{`>`}</button>
                </div>
            </div>
            <ul>
                {   
                    movieListData &&
                    movieListData.filter(movie => categoryId === 'all' || movie.genre_ids.includes(categoryId)).map(movie => (
                    <li className="movie_card" key={movie.id}>
                        <button 				
                            onClick={() =>
                                router.push({
                                    pathname: "/details",
                                    query: {
                                        id: movie.id,
                                    },
                                })
                            }>
                            <img
                                className="movie_backdrop"
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                alt={movie.original_title}
                            />
                        </button>
                    </li>
                ))}
            </ul>
    </div>
    );
};

export default MovieList;