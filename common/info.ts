import { IComment, IMovie, IReview, IUser } from './page'

export interface pageState {
}

export interface pagePayload {
    what: string;
}

export interface userPayload {
    user: IUser;
}

export interface moviePayload {
    movie: IMovie;
}

export interface commentPayload {
    comment: ICreateComment;
}

export interface reviewPayload {
    review: ICreateReview;
}

export interface ICreateComment {
    movie: string,
    user: string,
    title: string;
    comment : string,
    creationDate: string,
}

export interface ICreateReview {
    movie: string,
    user: string,
    title: string;
    review : string,
    rating: number,
    creationDate: string,
}

export interface AllState {
    comments: IComment[];
    users: IUser[];
    reviews: IReview[];
    movies: IMovie[];
}