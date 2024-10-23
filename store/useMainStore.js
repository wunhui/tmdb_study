import FavoriteList from "@components/favoriteList";

const { create } = require("zustand");


const useMovieStore = create((set) => ({
    categoryId: 'all', 
    favoriteList: [],
    setCategoryId: (id) => set({ categoryId: id }),
    setFavoriteList: (state) => set({ favoriteList: state})
}))

export default useMovieStore;