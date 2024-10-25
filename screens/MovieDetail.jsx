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

    const { data: ratingList, isLoading, refetch } = useQuery({
        queryKey: [...QueryKeys.RATING_LIST_QUERY],
        queryFn: fetchRatedMovies,
        select: (data) => data.find(item => item.id === Number(id)),
    }) 

    // 평점 추가
    const mutationAdd = useMutation({
        mutationFn: (newRating) => submitMovieRating(id, newRating),
        onMutate: (newRating) => {
            // 미리 임의로 값을 보여주는 방법도 있다고해서... 사용해봤습니다... 
            queryClient.setQueryData([...QueryKeys.RATING_LIST_QUERY], (oldData) => {
                if (!oldData || oldData.length === 0) {
                    return [{ id: Number(id), rating: Number(newRating) }];
                }
                
                const exists = oldData.some(item => item.id === Number(id));
                if (!exists) {
                    return [...oldData, { id: Number(id), rating: Number(newRating) }];
                }
            
                return oldData.map(item => 
                    item.id === Number(id) ? { ...item, rating: Number(newRating) } : item
                );
            });
        },
        onError: (error) => {
            console.error('평점 제출 오류:', error);
        },
        onSuccess: (success, data) => {
            console.log(`평점 ${data}점 추가됐음!`)
        }
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
        onMutate: () => {
            queryClient.setQueryData([...QueryKeys.RATING_LIST_QUERY], (oldData) => {
                const exists = oldData.filter(rating => rating.id !== Number(id))
                return [...exists]
            })
        },
        onSuccess: (success) => {
            console.log('평점 삭제 됐음')
        },
        onError: (error) => {
            console.error('평점 삭제 오류:', error);
        },
    })

    // 평점 삭제 이벤트
    const handleRatingDelete = () => {
        mutationDelete.mutate(id)
    }

    // 즐겨 찾기 추가
    const mutaionFavoriteAdd = useMutation({
        mutationFn: addMovieToFavorites,
        onSuccess: () => {
            alert('즐겨찾기에 추가되었습니다.');
        },
        onError: (error) => {
            console.error('즐겨찾기에 추가 오류:', error);
        },
    });

    // 즐겨 찾기 추가 이벤트
    const handleFavoriteSubmit = () => {
        mutaionFavoriteAdd.mutate(movieDetail)
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
                {isLoading ? (
                    <span className="loading-text">평점 목록을 불러오는 중입니다...</span>
                ) : (
                    <span>
                        {ratingList ? `${ratingList.rating}점` : '평점이 없습니다.'}
                    </span>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;