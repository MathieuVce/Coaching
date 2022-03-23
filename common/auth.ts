export interface User {
    displayName?: string;
    email?: string;
    providerId: string;
    uid: string;
}

export interface LoginState {
    password?: string;
    email?: string;
    authenticated?: boolean;
    user?: User;
}

export interface LoginPayLoad {
    password: string;
    email: string;
    user?: User;
    error?: string;
}

export interface RegisterState {
    password?: string;
    email?: string;
    registered?: boolean;
}

export interface RegisterPayLoad {
    password: string;
    email: string;
    displayName?: string;
    error?: string;
}

export interface AllState {
    authenticated: boolean;
    registered: boolean;
    user: User | undefined;
    message?: string;
}

export interface FirebaseError {
    code: string;
};