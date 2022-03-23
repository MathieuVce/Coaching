export enum AuthTypes {
    Login,
    Register
};

export interface AuthValues {
    email: string;
    password: string;
    confirmedPassword?: string;
    displayName?: string;
};