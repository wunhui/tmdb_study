import SearchForm from "@components/tv/SearchForm";
import SearchList from "@components/tv/SearchList";
import Tab from "@components/tv/Tab";
import BestTvList from "@components/tv/BestTvList";
import FavoriteList from "@components/tv/FavoriteList";
import useMovieStore from '@store/useMainStore';

const TvWrap = () => {
    const { searchValue } = useMovieStore()
    return (
        <>
            {/* <SearchForm />
            {
                searchValue &&
                searchValue.length > 0 &&
                <SearchList />
            }
            <Tab /> */}
            <BestTvList />
            {/* <FavoriteList /> */}
        </>
    )
}

export default TvWrap