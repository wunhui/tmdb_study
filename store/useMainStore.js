const { create } = require("zustand");


const useMovieStore = create((set) => ({
    categoryId: 'all',
    favoriteList: [],
    searchValue: '', 
    searchList: [],
    setCategoryId: (id) => set({ categoryId: id }),
    setFavoriteList: (state) => set({ favoriteList: state}),
    setSearchValue: (state) => set({ searchValue: state}),
    setSearchList: (state) => set({ searchList: state})
}))

export default useMovieStore;