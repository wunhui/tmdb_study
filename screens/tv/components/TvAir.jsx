import { fetchOnAirTivs } from "@api/tv/main"
import { QueryKeys } from "@constants/querys";
import { useQuery } from "@tanstack/react-query"

const TvAir = () => {
    const { data } = useQuery({
        queryKey: [...QueryKeys.ONAIR_TV_QUERY, 1],
        queryFn: () => fetchOnAirTivs(1),
    });

    console.log(data)
    return (
        <div className="movies_wrap">
            <ul className="card_wrap">
                {
                    data &&
                    data.map((item) => {
                        return (
                            <li className="card_list" key={item.id}>
                                <div className="img_wrap">
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                                    <div 
                                        class="circle_progress" 
                                        style={{
                                            background: `conic-gradient(#3F8BC9 0% ${item.vote_average * 10}%, #F2F2F2 ${item.vote_average * 10}% 100%)`
                                        }}>
                                        <span className="percent">{Math.floor(item.vote_average * 10)}%</span>
                                    </div>
                                </div>
                                <div className="text_wrap">
                                    <p className="date">
                                        {item.release_date}
                                    </p>
                                    <p className="title">
                                        {item.title}
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TvAir