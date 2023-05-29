import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import InventoryOptimizer from './pages/InventoryOptimizer';
import TopBar from './components/TopBar';
import SignIn from './pages/Home/signIn';
import SignUp from './pages/Home/signUp';
import UserSession from './services/auth';

const App = () => {
    // @ts-ignore
      return (
        <BrowserRouter>
            <TopBar />
            {/* <div style={{ marginTop: 100 }}> */}
                <Routes>
                    <Route
                        // exact
                        path="/"
                        element= {UserSession.isAuthenticated() ? <InventoryOptimizer /> : <SignIn/>}
                        // render={() => {
                        //     return UserSession.isAuthenticated() ? (
                        //         <Navigate to="/" />
                        //     ) : (
                        //         <Navigate to="/signin" />
                        //     )
                        // }}
                    />

                    <Route path="/inventory_optimizer" element={<InventoryOptimizer />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                </Routes>
            {/* </div> */}
        </BrowserRouter>
    )
}

export default App;
