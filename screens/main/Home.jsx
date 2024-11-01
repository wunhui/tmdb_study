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
