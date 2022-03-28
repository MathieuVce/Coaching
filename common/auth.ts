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

export interface LoginPayload {
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

export interface RegisterPayload {
    password: string;
    email: string;
    displayName?: string;
    error?: string;
}

export interface PasswordState {
    email: string;
    reset?: boolean;
}

export interface PasswordPayload {
    email: string;
    error?: string;
}

export interface AllState {
    authenticated: boolean;
    registered: boolean;
    user: User | undefined;
    reset: boolean;
    message?: string;
}

export interface FirebaseError {
    code: string;
};