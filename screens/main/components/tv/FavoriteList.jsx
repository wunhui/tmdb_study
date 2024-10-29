
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query';
import { useEffect } from "react";
import { QueryKeys } from "@constants/querys";
import { fetchFavoriteTvs } from "@api/tv/main";

const FavoriteList = () => {
    const router = useRouter();
    const { data: tvListData } = useQuery({
        queryKey: [...QueryKeys.FAVORITE_TV_QUERY],
        queryFn: fetchFavoriteTvs
    }) 
    
    return (
        <div className="favorite_movie_wrap">
            <div className="top">
                <h2>즐겨찾기 티비 프로그램</h2>
            </div>
            <ul>
                {   
                    tvListData ? (
                        tvListData.map(movie => (
                            <li className="movie_card" key={movie.id}>
                                <button 				
                                    onClick={() =>
                                        router.push({
                                            pathname: "/tvDetails",
                                            query: {
                                                id: movie.id,
                                            },
                                        })
                                    }>
                                    <img
                                        className="movie_backdrop"
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