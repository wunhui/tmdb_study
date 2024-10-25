import { TryRequestGet } from "@utils/TryRequest"

// 베스트 티비 프로그램 리스트
export const fetchTopRatedTivs = async (page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.log('error :', err)
    }
}