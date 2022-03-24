import React from 'react';
import { Provider } from "react-redux";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import App from "../routes/App";
import Home from "../routes/Home";
import store from "../store/storee";
import Users from "../routes/Users";
import Login from "../routes/Login";
import Items from "../routes/Items";
import NoPage from "../routes/NoPage";
import Reviews from "../routes/Reviews";
import Comments from "../routes/Comments";
import Register from "../routes/Register";
import { RequireAuth } from "./RequireAuth";
import Dashboard from "../routes/Dashboard";
import Password from '../routes/Password';

const Navigation: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register/>}/>
                        <Route path='password' element={<Password/>}/>
                    </Route>
                    <Route path='home' element={
                        <RequireAuth>
                            <Home/>
                        </RequireAuth> 
                    }>
                        <Route path='dashboard' element={<Dashboard/>}/>
                        <Route path='items' element={<Items/>}/>
                        <Route path='users' element={<Users/>}/>
                        <Route path='comments' element={<Comments/>}/>
                        <Route path='reviews' element={<Reviews/>}/>
                    </Route>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </Provider>
        </BrowserRouter>
    );
};

export default Navigation
