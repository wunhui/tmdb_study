import { TryRequestGet, TryRequestPost, TryRequestDelete } from "@utils/TryRequest"

// 영화 상세정보
export const fetchMovieDetails = async (movie_id) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/movie/${movie_id}?language=ko`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error :', err)
    }
}

// 평점 추가
export const submitMovieRating = async (movieId, rating) => {
    try {
        const body = { value: rating };
        const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
        const response = await TryRequestPost(url, body)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error :', err)
    }
}

// 평가 확인
export const fetchRatedMovies = async () => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/account/21584745/rated/movies?language=ko&page=1&sort_by=created_at.asc`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}

// 평가 삭제
export const removeMovieRating = async (movie_id) => {
    try {
        const response = await TryRequestDelete(`https://api.themoviedb.org/3/movie/${movie_id}/rating`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}

// 즐겨 찾기 추가
export const addMovieToFavorites = async (movieDetail) => {
    try {
        const requestBody = {
            media_type: 'movie',
            media_id: movieDetail.id,
            favorite: true
        };
        const url = `https://api.themoviedb.org/3/account/21584745/favorite`;
        const response = await TryRequestPost(url, requestBody)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error :', err)
    }
}