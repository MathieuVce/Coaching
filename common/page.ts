
export interface IPage {
    title: string;
    total: number;
    header: Array<{head: string; padding: string}>;
};

export interface IUser {
    email: string;
    name: string;
    username: string;
    comments: IComment[];
    reviews: IReview[];
    pricing: string;
    status: string;
    creationDate: string;
    info?: string;
};

export interface IComment {
    comment: string;
    item: string;
    creationDate: string;
    user: string;
}

export interface IReview {
    review: string;
    item: string;
    creationDate: string;
    rating: number;
    user: IUser;
}