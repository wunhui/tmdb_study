
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedTivs } from '@api/tv/main'
import useMovieStore from '@store/useMainStore';
import { useState } from "react";
import { QueryKeys } from "@constants/querys";

const MovieList = () => {
    const router = useRouter();
    const { categoryId } = useMovieStore();
    const [page, setPage] = useState(2)
    const { data: tvListData } = useQuery({
        queryKey: [...QueryKeys.BEST_TV_QUERY, page],
        queryFn: ()  => fetchTopRatedTivs(page),
        enabled: !!page,
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
        <div className="best_card_wrap">
            <div className="top">
                <h2>최고의 티비 프로그램</h2>
                <div className="btn_wrap">
                    <button onClick={() => handlePageCurrent(-1)}>{`<`}</button>
                    <button onClick={() => handlePageCurrent(1)}>{`>`}</button>
                </div>
            </div>
            <ul className="card_wrap">
                {   
                    tvListData &&
                    tvListData.map(tv => (
                    <li className="card_list" key={tv.id}>
                        <button 				
                            onClick={() =>
                                router.push({
                                    pathname: "/tvDetails",
                                    query: {
                                        id: tv.id,
                                    },
                                })
                            }>
                            <img
                                className="backdrop"
                                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                alt={tv.original_title}
                            />
                        </button>
                    </li>
                ))}
            </ul>
    </div>
    );
};

export default MovieList;