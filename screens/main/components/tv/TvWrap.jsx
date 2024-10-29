// import SearchForm from "@screens/SearchForm";
// import SearchList from "@screens/SearchList";
// import Tab from "@screens/Tab";
import FavoriteList from "@screens/main/components/tv/FavoriteList";
import BestTvList from "@screens/main/components/tv/BestTvList";
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
            <FavoriteList />
        </>
    )
}

export default TvWrap