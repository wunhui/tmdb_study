import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { QueryKeys } from '@constants/querys';
import { 
        fetchTvDetails, 
        submitTvRating,
        removeTvRating,
        fetchRatedTvs,
        addTvToFavorites
        } from '@api/tv/detail';
import { fetchFavoriteTvs } from '@api/tv/main';

const MovieDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [rating, setRating] = useState(0);  // 평점 상태

    // 영화 상세 정보
    const { data: tvDetail } = useQuery({
        queryKey: [...QueryKeys.DETAIL_TV_QUERY, id],
        queryFn: () => fetchTvDetails(id),
        enabled: !!id
    });
    
    const queryClient = useQueryClient();

    // 평점 목록
    const { data: ratingList, isFetching, refetch } = useQuery({
        queryKey: [...QueryKeys.TV_RATING_LIST_QUERY],
        queryFn: fetchRatedTvs,
        select: (data) => data.find(item => item.id === Number(id)),
    }) 

    // 평점 추가
    const mutationAdd = useMutation({
        mutationFn: (newRating) => submitTvRating(id, newRating),
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
        refetch()
    };
    
    // 평점 삭제
    const mutationDelete = useMutation({
        mutationFn: removeTvRating,
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
        refetch()
    }

    // // 즐겨 찾기 추가
    const mutaionFavoriteAdd = useMutation({
        mutationFn: addTvToFavorites,
        onSuccess: () => {
            alert('즐겨찾기에 추가되었습니다.');
        },
        onError: (error) => {
            console.error('즐겨찾기에 추가 오류:', error);
        },
    });

    // // 즐겨 찾기 추가 이벤트
    const handleFavoriteSubmit = () => {
        mutaionFavoriteAdd.mutate(tvDetail)
    }

    const { data: tvListData } = useQuery({
        queryKey: [...QueryKeys.FAVORITE_TV_QUERY],
        queryFn: fetchFavoriteTvs,
        select: (data) => data.filter(item => item.id === Number(id))
    }) 
    console.log(tvListData)
    return (
        <div className="movie_detail_wrap">
            <button 
                className='btn_back'
                onClick={() => router.back()}>{`<`}</button>
                {tvDetail && (
                    <>
                        <div className="top">
                            <div className="img_wrap">
                                <img
                                    className="movie_detail_backdrop"
                                    src={`https://image.tmdb.org/t/p/w500${tvDetail.backdrop_path}`}
                                    alt={tvDetail.name}
                                />
                                <button onClick={handleFavoriteSubmit} className='btn_favorites'>
                                    {
                                        tvListData && tvListData.length > 0 ? `♥` : `♡`
                                    }
                                </button>
                            </div>
                            <h2>{tvDetail.name}</h2>
                            <div className="label_wrap">
                                {
                                    tvDetail.genres.length > 0 &&
                                    tvDetail.genres.map((item) => {
                                        return (
                                            <span key={item.id} className='label'>{item.name}</span>
                                        )
                                    })
                                }
                            </div>
                            <p className='desc'>{tvDetail.overview}</p>
                            <p className='date'><span>출시일 : </span>{tvDetail.first_air_date}</p>
                            <p className='date'><span>총 에피소드 : </span>{tvDetail.number_of_episodes}회</p>
                            <p className='date'><span>총 시즌 : </span>{tvDetail.number_of_seasons}시즌</p>
                        </div>
                        
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
                                    <button onClick={handleRatingSubmit} className='btn_submit'>제출</button>
                                    <button onClick={handleRatingDelete} className='btn_delete'>삭제</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            <div className="ratings_list">
                <h3>내 평점</h3>
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