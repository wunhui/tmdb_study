const { TryRequestGet, TryRequestPost, TryRequestDelete } = require("@utils/TryRequest");

// 티비 목록
export const fetchTvDetails = async (tvId) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching TV details:', error);
    }
}

// 티비 평점 목록
export const fetchRatedTvs = async () => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/account/21584745/rated/tv?language=ko-KR&page=1&sort_by=created_at.asc`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}


// 티비 평점 추가
export const submitTvRating = async (tvId, rating) => {
    try {
        const body = { value: rating };
        const url = `https://api.themoviedb.org/3/tv/${tvId}/rating`;
        const response = await TryRequestPost(url, body);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error submitting TV rating:', error);
    }
}

// 티비 평점 삭제
export const removeTvRating = async (tvId) => {
    try {
        const url = `https://api.themoviedb.org/3/tv/${tvId}/rating`;
        const response = await TryRequestDelete(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (error) {
        console.log('Error submitting TV rating:', error);
    }
}

// 즐겨 찾기 추가
export const addTvToFavorites = async (tvDetail) => {
    try {
        const requestBody = {
            media_type: 'tv',
            media_id: tvDetail.id,
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

