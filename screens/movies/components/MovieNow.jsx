import { fetchNowPlayingMovies } from "@api/movie/main"
import { QueryKeys } from "@constants/querys";
import { useQuery } from "@tanstack/react-query"

const MovieNow = () => {

    const { data } = useQuery({
        queryKey: [...QueryKeys.NOW_MOVIE_QUERY],
        queryFn: () => fetchNowPlayingMovies,
    });

    console.log(data)
    return (
        <div>
            MovieNow
        </div>
    )
}

export default MovieNow