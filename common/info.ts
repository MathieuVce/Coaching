import { IComment, IReview, IUser } from './page'

export interface pageState {
}

export interface pagePayload {
    what: string;
}

export interface userPayload {
    user: IUser;
}

export interface AllState {
    comments: IComment[];
    users: IUser[];
    reviews: IReview[];
}