import BestMovieList from "@components/BestMovieList";
import Tab from "@components/Tab";
import FavoriteList from "@components/FavoriteList";
import { useRouter } from "next/router";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";

const HomeScreen = () => {
	const router = useRouter();
	// 테스트 api
    // const test = async () => {
	// 	const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;  
    //     try {
    //         const response = await fetch(
    //             'https://api.themoviedb.org/3/certification/movie/list', {
    //             method: 'GET',
    //             headers: {
    //                 accept: 'application/json',
    //                 Authorization: `Bearer ${token}`, 
    //             },
    //         });
            
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();
    //         return data;  // 유효한 데이터 반환
    //     } catch (err) {
    //         console.log('error :', err);
    //         return null;  // 오류 시 null 반환
    //     }
    // };

	// const { data } = useQuery({
    //     queryKey: ['testlist'],
    //     queryFn: test
    // }) 

    // useEffect(() => {
    //     if (data) {
    //         console.log(data);
    //     }
    // }, [data]);

	return (
		<>
			<Tab />
			<BestMovieList />
			<FavoriteList />
		</>
	);
};
export default HomeScreen;
