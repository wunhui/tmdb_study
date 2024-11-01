import { TryRequestGet } from "@utils/TryRequest"

// 영화 카테고리 목록
export const fetchMovieCategories = async () => {
    try {
        const response = await TryRequestGet('https://api.themoviedb.org/3/genre/movie/list?language=ko-KR')
        const data = await response.json();
    return data.genres; 
    } catch (err) {
        console.log('error :', err)
    }
}

// 베스트 영화 리스트
export const fetchTopRatedMovies = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`)
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
export const fetchFavoriteMovies = async () => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/account/21584745/favorite/movies?language=ko-KR&page=1&sort_by=created_at.asc`);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch(err) {
        console.error('error :', err)
    }
} 

// 현재 상영작
export const fetchNowPlayingMovies = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch(err) {
        console.error('error :', err)
    }
}

// 인기있는 영화
export const fetchPopularPlayingMovies = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch(err) {
        console.error('error :', err)
    }
}


// 상영 예정작
export const fetchUpcomingPlayingMovies = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${page}`)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch(err) {
        console.error('error :', err)
    }
}
