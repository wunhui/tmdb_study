import { TryRequestGet } from "@utils/TryRequest";

export const feachTvSearcher = async (searchQuery, page) => {
    try {
        const response = await TryRequestGet(`https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=ko-KR&page=1`)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results
    } catch (err) {
        console.error(err);
    }
}