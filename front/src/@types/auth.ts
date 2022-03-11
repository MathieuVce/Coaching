import { User } from "firebase/auth";

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
}

export interface RegisterState {
    password?: string;
    email?: string;
    registered?: boolean;
}

export interface RegisterPayLoad {
    password: string;
    email: string;
    displayName: string;
}

export interface AllState {
    authenticated?: boolean;
    registered?: boolean;
    user?: User;
}