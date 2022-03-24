export enum AuthTypes {
    Login,
    Register,
    Password
};

export interface AuthValues {
    email: string;
    password: string;
    confirmedPassword?: string;
    displayName?: string;
};