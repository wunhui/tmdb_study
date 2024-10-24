export class QueryKeys {
    static MOVIES = ['MOVIES'];
    
    static MAIN = 'MAIN';
    static DETAIL = 'DETAIL';
    static TAB = 'TAB';
    static BEST_MOVIE = 'BEST_MOVIE';
    static FAVORITE_MOVIE = 'FAVORITE_MOVIE';
    static DETAIL_INFO = 'DETAIL_INFO';
    static RATING_LIST = 'RATING_LIST';

    // 메인 쿼리
    static MAIN_QUERY = [...this.MOVIES, this.MAIN];
    static CATEGORY_ITEMS = [...this.MAIN_QUERY, this.TAB];
    static BEST_MOVIE_QUERY = [...this.MAIN_QUERY, this.BEST_MOVIE];
    static FAVORITE_MOVIE_QUERY = [...this.MAIN_QUERY, this.FAVORITE_MOVIE];

    // 상세 쿼리
    static DETAIL_QUERY = [...this.MOVIES, this.DETAIL];
    static MOVIE_DETAIL_QUERY = [...this.DETAIL_QUERY, this.DETAIL_INFO];
    static RATING_LIST_QUERY = [...this.DETAIL_QUERY, this.RATING_LIST];
}