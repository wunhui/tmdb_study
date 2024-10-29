import Tab from "@components/Tab";
import BestMovieList from "@screens/main/components/movie/BestMovieList";
import FavoriteList from "@screens/main/components/movie/FavoriteList";
const MovieWrap = () => {
    return (
        <>
            <Tab />
            <BestMovieList />
            <FavoriteList />
        </>
    )
}

export default MovieWrap