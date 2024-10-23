
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query';
import { useFavoriteMoviesList } from '@api/main'
import useMovieStore from '@store/useMainStore';
import { useEffect, useState } from "react";

const FavoriteList = () => {
    const router = useRouter();
    const { categoryId } = useMovieStore();
    const [page, setPage] = useState(2)

    const { data: movieListData } = useQuery({
        queryKey: ['favoriteMoviesList'],
        queryFn: useFavoriteMoviesList,
        keepPreviousData: true,
    }) 

    useEffect(() => {
        console.log(movieListData)
    })
    
    return (
        <div className="favorite_movie_wrap">
            <div className="top">
                <h2>즐겨찾기 영화</h2>
            </div>
            <ul>
                {   
                    movieListData ? (
                        movieListData.map(movie => (
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
                        ))
                    ) : <li className="empty_text">즐겨찾기한 영화가 없습니다.</li>
                }
            </ul>
    </div>
    );
};

export default FavoriteList;