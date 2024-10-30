import useMovieStore from '@store/useMainStore'
import SearchForm from '../search/components/SearchForm';
import SearchList from '../search/components/SearchList';
import MovieWrap from './components/movie/MovieWrap';
import TvWrap from './components/tv/TvWrap';
import { useEffect } from 'react';
import Header from '@components/layout/header';

const HomeScreen = () => {
	const { searchList, searchValue } = useMovieStore()
	useEffect(() => {
		console.log(searchList)
	}, [searchList])
	return (
		// 커밋테스트
		/*
			첫번째 질문 2024.10.28
			MovieDetail.jsx 
			해당 궁금한 부분이 이쪽입니다.
			{
				isFetching 
				? <span className="loading-text">데이터를 갱신 중입니다...</span>
				: <span>
					{ratingList ? `${ratingList.rating}점` : '평점이 없습니다.'}
				</span>
			}
			mutaion은 isLoading만 있던 데 mutaion.isLoading 을 사용해줘야하나요? 
			아니면 query의 isFetching을 사용해줘야하나요?
			isLoading이 서치 했을 때는 처음 데이터를 불러올 때 사용해줘야한다고 하는 데
			혹시 다른 경우에도 사용이 할 때가 있을 수 있을 거 같아 여쭤봅니다!
		*/

		/*
			두번째 질문 2024.10.29
			https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id
			로그인 및 회원가입 같은 것도 구현해보고 싶은데 위에 링크가 관련이 있는 걸까요?
			위에 것을 사용 못한다면 따로 구현해보는 방법도 있을 까요?

		 */

		/*
			세번째 질문 2024.10.30
			dev tool에 디테일 페이지 이동 후 뒤로가기 버튼을 누르게 되면 
			쿼리로 작성해둔 것들이 엄청 깜빡 깜빡 거리던데
			enabled를 특정값을 넣어둘수 없는 상황에서 false로 꺼두니깐 
			깜빡임이 사라지긴 했는 데 로드되는 게 너무 오래걸려서요 
			아래와 같이 마운트시 해두면 되는 걸까요?		
			const [isMounted, setIsMounted] = useState(false);
			useEffect(() => {
				setIsMounted(true);
			}, []);

		 */

		<>
			<Header>
				<SearchForm />
			</Header>
			{
				searchList &&
				searchList.length > 0 &&
				<SearchList />
			}
            <MovieWrap />
            <TvWrap />
		</>
	);
};
export default HomeScreen;
