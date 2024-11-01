import Tab from "@components/tab/Tab"
import TvAir from "./components/TvAir"
import TvPopular from "./components/TvPopular"
import TvToday from "./components/TvToday"
import TvTopRated from "./components/TvTopRated"
import { useState } from "react"

const Tv = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabList = [
        { id: 1, title: '현재 상영중', component: <TvAir />},
        { id: 2, title: '인기있는 프로그램', component: <TvPopular />},
        { id: 3, title: '최고 평점 프로그램', component: <TvToday />},
        { id: 4, title: '상영 예정 프로그램', component: <TvTopRated />},
    ]
    const handleTabActive = (idx) => {
        setActiveTab(idx)
    }

    const ActiveComponent = tabList[activeTab]?.component;
    return (
        <div className="tv">
                <div className="top">
                    <Tab activeTab={activeTab} tabList={tabList} onClick={handleTabActive}/>
                </div>
            <div className="tv_wrap">
                <div className="left">
                    <form action="">
                        <label htmlFor="">
                            <span className="label">검색</span>
                            <input type="text" placeholder="검색어를 입력해주세요" />
                        </label>
                        <label htmlFor="">
                            <span className="label">날짜</span>
                            <div className="date_form">
                                <input type="text" placeholder="검색어를 입력해주세요" />
                                <span>~</span>
                                <input type="text" placeholder="검색어를 입력해주세요" />
                            </div>
                        </label>
                        <label htmlFor="">
                            <span className="label">장르</span>
                            <div className="date_form">
                                <input type="text" />
                            </div>
                        </label>
                    </form>
                </div>
                <div className="right">
                    {ActiveComponent}
                </div>
            </div>
        </div>
    )
}

export default Tv