import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { QueryKeys } from "@constants/querys";
import { feachSearcher } from "@api/movie/search";
import useMovieStore from '@store/useMainStore';

const SearchForm = () => {
    const { pushSearchValue, setPushSearchValue, searchList, setSearchList } = useMovieStore();
    const { data: movieData } = useQuery({
        queryKey: [...QueryKeys.SEARCH_MOVIE_QUERY, pushSearchValue],
        queryFn: () => feachSearcher(pushSearchValue)
    });
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (movieData) {
            setSearchList(movieData)
        }
    }, [movieData])
    
    return (
        <div className="search_form_wrap">
            <div className="search_form">
                <input
                    type="text"
                    value={searchValue}v
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search_input"
                    placeholder="Search..."
                />
                <button 
                    type="submit"
                    className="search_btn"
                    onClick={() => setPushSearchValue(searchValue)}    
                >
                    검색
                </button>
            </div>
        </div>
    );
};

export default SearchForm;