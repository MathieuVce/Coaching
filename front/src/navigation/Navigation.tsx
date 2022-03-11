import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import React from 'react';
import { Provider } from "react-redux";
import App from "../App";
import store from "../store/storee";
import Login from "../routes/Login";
import NoPage from "../routes/NoPage";
import Register from "../routes/Register";
import Dashboard from "../routes/Dashboard";
import { RequireAuth } from "./RequireAuth";

const Navigation: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register/>}/>
                    </Route>
                    <Route path='/dashboard' element={
                        <RequireAuth>
                            <Dashboard/>
                        </RequireAuth> 
                    }/>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </Provider>
        </BrowserRouter>
    );
};

export default Navigation
