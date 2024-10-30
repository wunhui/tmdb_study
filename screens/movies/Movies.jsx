import Tab from "@components/tab/Tab"
import MovieNow from "./components/MovieNow"
import MoviePopular from "./components/MoviePopular"
import MovieTopRated from "./components/MovieTopRated"
import MovieUpcoming from "./components/MovieUpcoming"
import { useState } from "react"

const Movies = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabList = [
        { id: 1, title: '현재 상영작', component: <MovieNow />},
        { id: 2, title: '인기있는 영화', component: <MoviePopular />},
        { id: 3, title: '최고 평점 영화', component: <MovieTopRated />},
        { id: 4, title: '상영 예정작', component: <MovieUpcoming />},
    ]
    const handleTabActive = (idx) => {
        setActiveTab(idx)
    }

    const ActiveComponent = tabList[activeTab]?.component;
    return (
        <div className="movies">
            <div className="movies_wrap">
                <Tab activeTab={activeTab} tabList={tabList} onClick={handleTabActive}/>
                {ActiveComponent}
            </div>
        </div>
    )
}

export default Movies