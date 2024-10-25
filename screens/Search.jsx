import useMovieStore from '@store/useMainStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const SearchWrap = () => {
    const router = useRouter();
    const { searchList, setSearchList } = useMovieStore();

    useEffect(() => {
        const storedData = localStorage.getItem("search_movie_data");
        if (storedData) {
            setSearchList(JSON.parse(storedData));
        }
    }, []);

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
                    searchList &&
                    searchList.map(movie => (
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
