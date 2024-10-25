// import { useQuery } from '@tanstack/react-query';
// import { fetchMovieCategories } from '@api/movie/main'
// import useMovieStore from '@store/useMainStore';
// import { QueryKeys } from '@constants/querys';

// const Tab = () => {
//     const { setCategoryId } = useMovieStore();
    
//     const { data: categoryData } = useQuery({
//         queryKey: [...QueryKeys.CATEGORY_ITEMS],
//         queryFn: fetchMovieCategories
//     }) 

//     return (
//         <div className='tab_wrap'>
//             <ul>
//                 {categoryData &&
//                     [
//                         { id: 'all', name: '전체' },  // '전체' 항목 추가
//                         ...categoryData
//                     ].map((genres) => {
//                         return (
//                             <li key={genres.id} className='tab_list'>
//                                 <button type="button" onClick={() => setCategoryId(genres.id)}>
//                                     <span>{genres.name}</span>
//                                 </button>
//                             </li>
//                         );
//                     })
//                 }
//             </ul>
//         </div>
//     );
// };

// export default Tab;