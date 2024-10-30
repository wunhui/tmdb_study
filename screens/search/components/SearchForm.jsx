import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { QueryKeys } from "@constants/querys";
import { feachMovieSearcher } from "@api/movie/search";
import { feachTvSearcher } from "@api/tv/search";
import useMovieStore from '@store/useMainStore';

const SearchForm = () => {
    const { pushSearchValue, setPushSearchValue, searchValue, setSearchValue, setSearchList } = useMovieStore();
    const { data: movieData } = useQuery({
        queryKey: [...QueryKeys.SEARCH_MOVIE_QUERY, pushSearchValue],
        queryFn: () => feachMovieSearcher(pushSearchValue),
        enabled: !!pushSearchValue
    });

    const { data: tvData } = useQuery({
        queryKey: [...QueryKeys.SEARCH_TV_QUERY, pushSearchValue],
        queryFn: () => feachTvSearcher(pushSearchValue),
        enabled: !!pushSearchValue
    });

    useEffect(() => {
        if(movieData || tvData) {
            const movieItems = (movieData || []).map(movie => ({ ...movie, type: 'movie' }))
            const tvItems = (tvData || []).map(tv => ({ ...tv, type: 'tv' }))
            const data = movieItems?.concat(tvItems).sort((a, b) => {
                return b.vote_count - a.vote_count
            })
            setSearchList(data)
        }
    }, [movieData, tvData])



    const handleSearchClick = () => {
        if (pushSearchValue !== searchValue) {
            setPushSearchValue(searchValue);
        }
    };

    useEffect(() => {
        if(searchValue === '') {
            setSearchList([])
        }
    }, [searchValue])
    return (
        <div className="search_form_wrap">
            <div className="search_form">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search_input"
                    placeholder="검색어를 입력해주세요."
                />
                <button 
                    type="submit"
                    className="search_btn"
                    onClick={handleSearchClick}
                >
                    ⌕
                </button>
            </div>
        </div>
    );
};

export default SearchForm;