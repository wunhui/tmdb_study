import { TryRequestGet } from "@utils/TryRequest"

// 영화 카테고리 목록
export const useMovieCategory = async () => {
    try {
        const response = await TryRequestGet('https://api.themoviedb.org/3/genre/movie/list?language=ko')
        const data = await response.json();
    return data.genres; 
    } catch (err) {
        console.log('error :', err)
    }
}

// 베스트 영화 리스트
export const useBestMovieList = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/movie/top_rated?language=ko&page=${page}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}

// 즐겨찾기 리스트
export const useFavoriteMoviesList = async () => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/account/21584745/favorite/movies?language=ko&page=1&sort_by=created_at.asc`);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch(err) {
        console.error('error :', err)
    }
} 