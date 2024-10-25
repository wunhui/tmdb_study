import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { QueryKeys } from "@constants/querys";
import { feachSearcher } from "@api/movie/search";
import { feachTvSearcher } from "@api/tv/search";
import useMovieStore from '@store/useMainStore';

const SearchForm = () => {
    const { searchValue, setSearchValue, searchList, setSearchList } = useMovieStore();
    const { data: movieData, isLoading: isLoadingMovieList } = useQuery({
        queryKey: [...QueryKeys.SEARCH_MOVIE_QUERY, searchValue],
        queryFn: () => feachSearcher(searchValue)
    });

    const { data: tvData, isLoading: isLoadingTvList } = useQuery({
        queryKey: [...QueryKeys.SEARCH_MOVIE_QUERY, searchValue],
        queryFn: () => feachTvSearcher(searchValue)
    });
    // 폴더 위치 변경 예정 
    // https://developer.themoviedb.org/reference/search-multi 이거 사용해서 구분해서 사용하는 게 좋나요?
    // 아니면 각각 사용하는 게 좋나요?

    //  그리고 로컬스토리지에 저장해서 띄우는 거 말고 좋은 방법이 있을까요?
    useEffect(() => {
        if (movieData) {
            setSearchList(movieData);
            localStorage.setItem("search_movie_data", JSON.stringify(movieData));
        }
    }, [movieData]);

    useEffect(() => {
        const storedData = localStorage.getItem("search_movie_data");
        if (storedData) {
            setSearchList(JSON.parse(storedData));
        }
    }, []);

    // 미적용
    // useEffect(() => {
    //     if (tvData) {
    //         setSearchList(tvData);
    //         localStorage.setItem("search_tv_data", JSON.stringify(tvData));
    //     }
    // }, [tvData]);

    // useEffect(() => {
    //     const storedData = localStorage.getItem("search_tv_data");
    //     if (storedData) {
    //         setSearchList(JSON.parse(storedData));
    //     }
    // }, []);

    return (
        <div className="search_form_wrap">
            <div className="search_form">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search_input"
                    placeholder="Search..."
                />
            </div>
        </div>
    );
};

export default SearchForm;