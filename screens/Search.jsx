import useMovieStore from '@store/useMainStore';
import { feachSearcher } from "@api/movie/search";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/querys';
const SearchWrap = () => {
    const router = useRouter();
    const { pushSearchValue } = router.query;
    const { data: movieData } = useQuery({
        queryKey: [...QueryKeys.SEARCH_MOVIE_QUERY, pushSearchValue],
        queryFn: () => feachSearcher(pushSearchValue),
        enabled: !!pushSearchValue,
    });
    useEffect(() => {

    }, [router.query, movieData]);
    return (
        <div className="search_movie_wrap">
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
            <ul>
                {   
                    movieData &&
                    movieData.map(movie => (
                    <li className="movie_card" key={movie.id}>
                        <button 				
                            onClick={() =>
                                router.push({
                                    pathname: "/details",
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
        </div>
    );
}

export default SearchWrap;
