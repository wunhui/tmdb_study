import { TryRequestGet } from "@utils/TryRequest"

export const useFavoriteMovies = async () => {
    try {
        const response = await TryRequestGet('https://api.themoviedb.org/3/account/21584745/favorite/movies?language=ko&page=1&sort_by=created_at.asc');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return data
    } catch(err) {
        console.log('error :', err)
    }
}