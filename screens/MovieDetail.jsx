import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
        useMovieDetails,
        useAddRating,
        useDeleteRating, 
        useAccountMovie,
        useAddFavorites,
        useFavoriteMoviesList } from '@api/detail';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MovieDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [rating, setRating] = useState(0);  // 평점 상태

    // 영화 상세 정보
    const { data: movieDetail } = useQuery({
        queryKey: ['movieDetail', id],
        queryFn: () => useMovieDetails(id),
        enabled: !!id
    });

    const queryClient = useQueryClient();

    // 평점 목록
    const { data: ratingList } = useQuery({
        queryKey: ['ratingList'],
        queryFn: useAccountMovie,
    }) 
    useEffect(() => {

    }, [ratingList])
    // 평점 추가
    const mutationAdd = useMutation({
        mutationFn: (newRating) => useAddRating(id, newRating),
        onSuccess: () => {
            // 딜레이 문제로 인해 성공시 재 호출
            queryClient.invalidateQueries({queryKey: ['ratingList']});
            alert(`평점: ${rating}점이 제출되었습니다.`)
        },
        onError: (error) => {
            console.error('평점 제출 오류:', error);
        },
    });
    
    const handleRatingSubmit = () => {
        if (rating > 0 && rating < 11) {
            mutationAdd.mutate(rating);
        } else {
            alert(`평점을 다시 입력해 주세요.`);
        }
    };

    // 평점 삭제
    const mutaionDelete = useMutation({
        mutationFn: useDeleteRating,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['ratingList']});
            alert(`평점이 삭제되었습니다.`)
        },
        onError: (error) => {
            console.error('평점 삭제 오류:', error);
        },
    })

    const handleRatingDelete = () => {
        mutaionDelete.mutate(id)
    }

    // 즐겨 찾기 추가
    const mutaionFavoriteAdd = useMutation({
        mutationFn: useAddFavorites,
        onSuccess: () => {
            alert('즐겨찾기에 추가되었습니다.');
        },
        onError: (error) => {
            console.error('즐겨찾기에 추가 오류:', error);
        },
    });

    const handleFavoriteSubmit = () => {
        if(movieDetail) {
            mutaionFavoriteAdd.mutate(movieDetail)
        }
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
                    ratingList ?
                    ratingList.filter(item => item.id === Number(id)).map(item => (
                        <span key={item.id}>
                            {item.rating}점
                        </span>
                    )) : <span>평점이 없습니다.</span>
                }
            </div>
        </div>
    );
};

export default MovieDetail;