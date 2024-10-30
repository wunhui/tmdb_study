import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryKeys } from '@constants/querys';
import { 
        fetchMovieDetails,
        submitMovieRating,
        removeMovieRating, 
        fetchRatedMovies,
        addMovieToFavorites  } from '@api/movie/detail';
import { fetchFavoriteMovies } from '@api/movie/main'
const MovieDetail = () => {
    const queryClient = useQueryClient();
    const router = useRouter(); 
    const { id } = router.query; // 쿼리스트링 값 비교
    const [rating, setRating] = useState(0);  // 평점 상태

    // 영화 상세 정보
    const { data: movieDetail } = useQuery({
        queryKey: [...QueryKeys.DETAIL_MOVIE_QUERY, id],
        queryFn: () => fetchMovieDetails(id),
        enabled: !!id
    });

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

    // 즐겨 찾기 확인용
    const { data: movieListData } = useQuery({
        queryKey: [...QueryKeys.FAVORITE_MOVIE_QUERY],
        queryFn: fetchFavoriteMovies,
        select: (data) => data.filter(item => item.id === Number(id))
    }) 

    // 상영 시간 
    const formatTime = (totMin) => {
        const hours = Math.floor(totMin / 60);
        const minutes = totMin % 60;
        return `${hours}시간${minutes}분`;
    }

    // 총 수익
    const formatRevenue = (revenue) => {
        return revenue.toLocaleString();
    };
    return (
        <div className="movie_detail_wrap">
            <button 
                className='btn_back'
                onClick={() => router.back()}>{`<`}</button>
                {movieDetail && (
                    <>
                        <div className="top">
                            <div className="img_wrap">
                                <img
                                    className="movie_detail_backdrop"
                                    src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}
                                    alt={movieDetail.title}
                                />
                                <button onClick={handleFavoriteSubmit} className='btn_favorites'>
                                    {
                                        movieListData && movieListData.length > 0 ? `♥` : `♡`
                                    }
                                </button>
                            </div>
                            <h2>{movieDetail.title}</h2>
                            <div className="label_wrap">
                                {
                                    movieDetail.genres.length > 0 &&
                                    movieDetail.genres.map((item) => {
                                        return (
                                            <span key={item.id} className='label'>{item.name}</span>
                                        )
                                    })
                                }
                            </div>
                            <p className='desc'>{movieDetail.overview}</p>
                            <p className='date'><span>출시일 : </span>{movieDetail.release_date}</p>
                            <p className='date'><span>상영 시간 : </span>{formatTime(movieDetail.runtime)}</p>
                            <p className='date'><span>월드 박스오피스 : </span>${formatRevenue(movieDetail.revenue)}</p>
                        </div>
                        <div className="rating_wrap">
                            <p>평점 남기기</p>
                            <div className="form">
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    min="0"
                                    max="10"
                                />
                                <div className="btn_wrap">
                                    <button onClick={handleRatingSubmit} className='btn_submit'>제출</button>
                                    <button onClick={handleRatingDelete} className='btn_delete'>삭제</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            <div className="ratings_list">
                <p>내 평점</p>
                {
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