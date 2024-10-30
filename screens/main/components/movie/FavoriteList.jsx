
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteMovies } from '@api/movie/main'
import { useEffect, useState } from "react";
import { QueryKeys } from "@constants/querys";

const FavoriteList = () => {
    const router = useRouter();
    const { data: movieListData } = useQuery({
        queryKey: [...QueryKeys.FAVORITE_MOVIE_QUERY],
        queryFn: fetchFavoriteMovies,
        
    }) 

    
    return (
        <div className="favorite_card_wrap">
            <div className="top">
                <h2>즐겨찾기 영화</h2>
            </div>
            <ul className="card_wrap">
                {   
                    movieListData ? (
                        movieListData.map(movie => (
                            <li className="card_list" key={movie.id}>
                                <button 				
                                    onClick={() =>
                                        router.push({
                                            pathname: "/movieDetails",
                                            query: {
                                                id: movie.id,
                                            },
                                        })
                                    }>
                                    <img
                                        className="backdrop"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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