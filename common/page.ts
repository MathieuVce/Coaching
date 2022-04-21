
export interface IPage {
    title: string;
    total: number;
    header: Array<{head: string; padding: string}>;
};

export enum IPageType {
    USER,
    COMMENT,
    REVIEW,
    ITEM,
};

export interface IUser {
    email: string;
    name: string;
    username: string;
    comments: number;
    reviews: number;
    pricing: string;
    status: string | boolean;
    creationDate: string;
    info?: string;
};

export interface IComment {
    comment: string | undefined;
    item: string;
    creationDate: string;
    user: string;
    title: string;
}

export interface IReview {
    review: string;
    item: string;
    creationDate: string;
    rating: number;
    user: string;
    title: string;
}

export interface IMovie {
    title: string;
    rating: number;
    category: string;
    views: number;
    status: string | boolean;
    creationDate: string;
}