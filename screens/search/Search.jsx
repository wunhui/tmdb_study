import useMovieStore from '@store/useMainStore';
import { feachMovieSearcher } from "@api/movie/search";
import { feachTvSearcher } from '@api/tv/search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/querys';
const SearchWrap = () => {
    const router = useRouter();
    const { pushSearchValue } = router.query;
    const { data: movieData } = useQuery({
        queryKey: [...QueryKeys.SEARCH_MOVIE_QUERY, pushSearchValue],
        queryFn: () => feachMovieSearcher(pushSearchValue),
        enabled: !!pushSearchValue,
    });
    const { data: tvData } = useQuery({
        queryKey: [...QueryKeys.SEARCH_TV_QUERY, pushSearchValue],
        queryFn: () => feachTvSearcher(pushSearchValue),
        enabled: !!pushSearchValue,
    });

    useEffect(() => {

    }, [router.query]);

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageCurrent = (direction) => {
        setCurrentPage(prev => prev + direction);
    };
    return (
        <div className="search_detail">
            <button 
                className='btn_back'
                onClick={() => router.back()}>
                {`<`}
            </button>
            <div className="top">
                <h2>검색 결과</h2>
                <div className="btn_wrap">
                    <button onClick={() => handlePageCurrent(-1)}>{`<`}</button>
                    <button onClick={() => handlePageCurrent(1)}>{`>`}</button>
                </div>
            </div>
            <h3 className="card_title">영화</h3>
            <ul className='card'>
                {   
                    movieData &&
                    movieData.filter(item => item.backdrop_path).map(movie => (
                    <li className="card_list" key={movie.id}>
                        <button 				
                            onClick={() =>
                                router.push({
                                    pathname: "/movieDetails",
                                    query: { id: movie.id },
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
            <h3 className="card_title">티비</h3>
            <ul className='card'>
                {   
                    tvData &&
                    tvData.filter(item => item.backdrop_path).map(tv => (
                    <li className="card_list" key={tv.id}>
                        <button 				
                            onClick={() =>
                                router.push({
                                    pathname: "/tvDetails",
                                    query: { id: tv.id },
                                })
                            }>
                            <img
                                className="movie_backdrop"
                                src={`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`}
                                alt={tv.original_title}
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchWrap;
