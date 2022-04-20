import { IComment, IReview, IUser } from './page'

export interface AllState {
    comments: IComment[];
    users: IUser[];
    reviews: IReview[];
}