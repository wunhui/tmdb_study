import { TryRequestGet } from "@utils/TryRequest"

// 베스트 티비 프로그램 리스트
export const fetchTopRatedTivs = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/tv/top_rated?language=ko-KRS&page=${page}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}


// 즐겨찾기 티비 리스트
export const fetchFavoriteTvs = async () => {
    try {   
        const response = await TryRequestGet(`https://api.themoviedb.org/3/account/21584745/favorite/tv?language=ko-KR&page=1&sort_by=created_at.asc`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (error) {
        console.log('티비 즐겨찾기 목록 오류',error)
    }
}

// 오늘 방영 프로그램 리스트
export const fetchTodayTvs = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=${page}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}

// 방송 중 티비 프로그램 리스트
export const fetchOnAirTivs = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=${page}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}

// 최고평점 티비 프로그램 리스트
export const fetchPopularTivs = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/tv/popular?language=${page}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}