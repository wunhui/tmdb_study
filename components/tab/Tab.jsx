const Tab = ({tabList, onClick, activeTab}) => {
    return (
        <div className="tab_wrap">
            <ul>
                {
                    tabList.map((item, idx) => {
                        return (
                            <li key={item.id} className={`tab_list ${activeTab === idx ? 'active' : ''}`}>
                                <button onClick={() => onClick(idx)}>{item.title}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Tab