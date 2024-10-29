import useMovieStore from '@store/useMainStore';
import { feachMovieSearcher } from "@api/movie/search";
import { feachTvSearcher } from '@api/tv/search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/querys';
const SearchWrap = () => {
    const router = useRouter();
    const [data, setData] = useState([])
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
        if(movieData || tvData) {
            console.log('movieData:', movieData)
            console.log('tvData:', tvData)
            const movieItems = (movieData || []).map(movie => ({ ...movie, type: 'movie' }))
            const tvItems = (tvData || []).map(tv => ({ ...tv, type: 'tv' }))
            const data = movieItems?.concat(tvItems).sort((a, b) => {
                return b.vote_count - a.vote_count
            })
            console.log('mix data :', data)
            setData(data)
        }
    }, [movieData, tvData])

    useEffect(() => {

    }, [router.query]);

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageCurrent = (direction) => {
        setCurrentPage(prev => prev + direction);
    };
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
                    data &&
                    data.filter(item => item.backdrop_path).map(movie => (
                    <li className="movie_card" key={movie.id}>
                        <button 				
                            onClick={() =>
                                router.push({
                                    pathname: movie.type === 'movie' ?
                                                "/movieDetails" :
                                                "/tvDetails",
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
