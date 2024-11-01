import useMovieStore from '@store/useMainStore';
import { useRouter } from 'next/router';
const SearchList = () => {
    const { pushSearchValue, searchList } = useMovieStore();
    const router = useRouter();
    return (
        <div className='search_list_wrap'>
            <div className="top">
                <button 
                    type="button"
                    onClick={() =>
                        router.push({
                            pathname: "/search",
                            query: { pushSearchValue: pushSearchValue },
                        })}>전체보기
                </button>
            </div>
            <ul className='content'>
                {
                    searchList.length > 0 ?
                    searchList.filter(item => item.title)?.map((item, idx) => (
                        <li className='search_list' key={idx}>
                            <button onClick={() =>
                                router.push({
                                    pathname: item.type === 'movie' ?
                                    "/movieDetails" :
                                    "/tvDetails",
                                    query: { id: item.id },
                                })
                            }>
                                <p>{item.title}</p>
                            </button>
                        </li>
                    )) :
                    <li className='emtpy_text'>검색 결과가 없습니다.</li>
                }
            </ul>
        </div>
    );
}

export default SearchList;