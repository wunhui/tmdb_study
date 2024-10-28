const { create } = require("zustand");


const useMovieStore = create((set) => ({
    categoryId: 'all',
    favoriteList: [],
    pushSearchValue: '', 
    searchList: [],
    setCategoryId: (id) => set({ categoryId: id }),
    setFavoriteList: (state) => set({ favoriteList: state}),
    setPushSearchValue: (state) => set({ pushSearchValue: state}),
    setSearchList: (state) => set({ searchList: state})
}))

export default useMovieStore;