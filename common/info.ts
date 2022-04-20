import { IComment, IReview, IUser } from './page'

export interface deleteCommentsState {
}

export interface deleteCommentsPayload {
    what: string;
}

export interface AllState {
    comments: IComment[];
    users: IUser[];
    reviews: IReview[];
}