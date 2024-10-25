import useMovieStore from '@store/useMainStore';
import Link from 'next/link';
import { useEffect } from 'react';

const SearchList = () => {
    const { searchList, setSearchList } = useMovieStore();

    useEffect(() => {
        const storedData = localStorage.getItem("search_movie_data");
        if (storedData) {
            setSearchList(JSON.parse(storedData));
        }
    }, []);

    return (
        <div className='search_wrap'>
            <div className="top">
                <Link href="/search">전체보기</Link>
            </div>
            <ul className='content'>
                {
                    searchList.length > 0 ?
                    searchList.map((item, idx) => (
                        <li className='search_list' key={idx}>
                            <button onClick={() =>
                                router.push({
                                    pathname: "/details",
                                    query: { id: item.id },
                                })
                            }>
                                <p>{item.title}</p>
                                <span>{item.overview}</span>
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