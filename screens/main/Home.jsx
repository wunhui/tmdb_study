import useMovieStore from '@store/useMainStore'
import SearchForm from './components/SearchForm';
import SearchList from './components/SearchList';
import MovieWrap from './components/movie/MovieWrap';
import TvWrap from './components/tv/TvWrap';
import { useEffect } from 'react';

const HomeScreen = () => {
	const { searchList } = useMovieStore()
	useEffect(() => {
		console.log(searchList)
	}, [searchList])
	return (
		<>
			<SearchForm />
			{
				searchList &&
				<SearchList />
			}
            <MovieWrap />
            <TvWrap />
		</>
	);
};
export default HomeScreen;
