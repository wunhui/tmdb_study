import SearchForm from "@components/movie/SearchForm";
import SearchList from "@components/movie/SearchList";
import Tab from "@components/movie/Tab";
import BestMovieList from "@components/movie/BestMovieList";
import FavoriteList from "@components/movie/FavoriteList";
import useMovieStore from '@store/useMainStore';

const MovieWrap = () => {
    const { searchList } = useMovieStore()
    return (
        <>
            <SearchForm />
            {
                searchList &&
                searchList.length > 0 &&
                <SearchList />
            }
            <Tab />
            <BestMovieList />
            <FavoriteList />
        </>
    )
}

export default MovieWrap