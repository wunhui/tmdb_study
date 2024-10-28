import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { QueryKeys } from '@constants/querys';
import { 
        fetchMovieDetails,
        submitMovieRating,
        removeMovieRating, 
        fetchRatedMovies,
        addMovieToFavorites } from '@api/movie/detail';

const MovieDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [rating, setRating] = useState(0);  // 평점 상태

    // 영화 상세 정보
    const { data: movieDetail } = useQuery({
        queryKey: [...QueryKeys.DETAIL_MOVIE_QUERY, id],
        queryFn: () => fetchMovieDetails(id),
        enabled: !!id
    });

    const queryClient = useQueryClient();

    // 평점 목록
    const { data: ratingList, isFetching } = useQuery({
        queryKey: [...QueryKeys.RATING_LIST_QUERY],
        queryFn: fetchRatedMovies,
        select: (data) => data.find(item => item.id === Number(id)),
    }) 

    // 평점 추가
    const mutationAdd = useMutation({
        mutationFn: (newRating) => submitMovieRating(id, newRating),
        onMutate: async (newRating) => {

            const previousRatings = queryClient.getQueryData(QueryKeys.RATING_LIST_QUERY);
    
            queryClient.setQueryData(QueryKeys.RATING_LIST_QUERY, (oldData) => {
                if (!oldData) return [{ id: Number(id), rating: Number(newRating) }];
                
                const exists = oldData.some(item => item.id === Number(id));
                return exists
                    ? oldData.map(rating => 
                        rating.id === Number(id) 
                        ? { ...rating, rating: Number(newRating) } 
                        : rating
                      )
                    : [...oldData, { id: Number(id), rating: Number(newRating) }];
            });
    
            return { previousRatings };
        },
        onSettled: () => queryClient.invalidateQueries(QueryKeys.RATING_LIST_QUERY),
        onError: (error, _, context) => {
            console.error('평점 추가 오류:', error);
            if (context?.previousRatings) {
                // 이전 데이터 값이 있으면 데이터 값 추가
                queryClient.setQueryData(QueryKeys.RATING_LIST_QUERY, context.previousRatings);
            }
        },
    });
    
    
    // 평점 추가 이벤트
    const handleRatingSubmit = () => {
        if (rating > 0 && rating < 11) {
            mutationAdd.mutate(rating);
        } else {
            alert(`평점을 다시 입력해 주세요.`);
        }
    };
    
    // 평점 삭제
    const mutationDelete = useMutation({
        mutationFn: removeMovieRating,
        onMutate: async () => {
            const previousRatings = queryClient.getQueryData(QueryKeys.RATING_LIST_QUERY);
            
            queryClient.setQueryData(QueryKeys.RATING_LIST_QUERY, (oldData) => 
                oldData ? oldData.filter(rating => rating.id !== Number(id)) : []
            );
    
            return { previousRatings };
        },
        onSettled: () => queryClient.invalidateQueries(QueryKeys.RATING_LIST_QUERY),
        onError: (error, _, context) => {
            console.error('평점 삭제 오류:', error);
            if (context?.previousRatings) {
                queryClient.setQueryData(QueryKeys.RATING_LIST_QUERY, context.previousRatings);
            }
        },
    });

    // 평점 삭제 이벤트
    const handleRatingDelete = () => {
        mutationDelete.mutate(id);
    }

    // // 즐겨 찾기 추가
    const mutaionFavoriteAdd = useMutation({
        mutationFn: addMovieToFavorites,
        onSuccess: () => {
            alert('즐겨찾기에 추가되었습니다.');
        },
        onError: (error) => {
            console.error('즐겨찾기에 추가 오류:', error);
        },
    });

    // // 즐겨 찾기 추가 이벤트
    const handleFavoriteSubmit = () => {
    //     mutaionFavoriteAdd.mutate(movieDetail)
    }

    return (
        <div className="movie_detail_wrap">
            <button 
                className='btn_back'
                onClick={() => router.back()}>{`<`}</button>
                {movieDetail && (
                    <>
                        <img
                            className="movie_detail_backdrop"
                            src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}
                            alt={movieDetail.title}
                        />
                        <h2>{movieDetail.title}</h2>
                        <p>{movieDetail.overview}</p>
                        
                        <div className="rating_wrap">
                            <h3>평점 남기기</h3>
                            <div className="form">
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    min="0"
                                    max="10"
                                />
                                <div className="btn_wrap">
                                    <button onClick={handleRatingSubmit} className='btn_submit'>평점 제출</button>
                                    <button onClick={handleRatingDelete} className='btn_delete'>평점 삭제</button>
                                    <button onClick={handleFavoriteSubmit} className='btn_delete'>즐겨찾기</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            <div className="ratings_list">
                <h3>내 평점</h3>
                {
                // mutaion은 isLoading만 있던 데 mutaion.isLoading 을 사용해줘야하나요? 
                // 아니면 query의 isFetching을 사용해줘야하나요?
                // isLoading이 서치 했을 때는 처음 데이터를 불러올 때 사용해줘야한다고 하는 데
                // 혹시 다른 경우에도 사용이 할 때가 있을 수 있을 거 같아 여쭤봅니다!
                    isFetching 
                    ? <span className="loading-text">데이터를 갱신 중입니다...</span>
                    : <span>
                        {ratingList ? `${ratingList.rating}점` : '평점이 없습니다.'}
                      </span>
                }
            </div>
        </div>
    );
};

export default MovieDetail;