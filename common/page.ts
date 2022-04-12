export interface IPage {
    title: string;
    total: number;
    header: Array<{head: string; padding: string}>;
};

export interface IUser {
    email: string;
    name: string;
    username: string;
    comments: string[];
    reviews: string[];
    pricing: string;
    status: string;
    creationDate: Date;
    info: string;
};