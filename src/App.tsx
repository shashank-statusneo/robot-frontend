import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css'; 
import { BrowserRouter, Routes, Route, Navigate, Form } from 'react-router-dom'
import InventoryOptimizer from './pages/InventoryOptimizer';
import WareHouse from './pages/Warehouse';
import TopBar from './components/TopBar';
import SignIn from './pages/Home/signIn';
import SignUp from './pages/Home/signUp';
import Profile from './pages/Home/profile';
import UserSession from './services/auth';
import { TabContext } from '@mui/lab';
import {Container, Tabs, Tab} from '@mui/material'
import BenchmarkProductivity from './pages/Warehouse/BenchmarkProductivity';


const App = () => {

    const [currentTab, setCurrentTab] = useState('warehouse');
  
    const FormData = () => {
        switch (currentTab) {
            case 'warehouse':
                return <WareHouse />
            case 'inventory':
                return <InventoryOptimizer />
            default:
                return <></>
        }
    }

    const AppTabs = () => {

        const mainMenuTabs: any = {
                warehouse: 'Warehouse',
                inventory: 'Inventory',
                network: 'Network',
                blending: 'Blending',
                pricing: 'Pricing',
        }
        
        return (
            <Container maxWidth="xl">
                <TabContext value={currentTab}>
                    <Tabs
                        variant="fullWidth"
                        style={{marginBottom: '10px'}}
                        selectionFollowsFocus
                        aria-label="Application Tabs"
                        value={currentTab}
                        onChange={(_, value) => {
                            setCurrentTab(value)
                        }}
                    >
                        {Object.keys(mainMenuTabs).map((value: any, index: any) => (
                            <Tab key={index} value={value} label={mainMenuTabs[value]} sx={{fontWeight: 'bold', fontSize: '1.5rem'}}/>
                        ))}
                    </Tabs>
                </TabContext>
            </Container>
        )
    }


    // @ts-ignore
      return (
        <BrowserRouter>
            <TopBar />
            {UserSession.isAuthenticated() ? 
                <>
                    <AppTabs/>
                    <FormData />
                </>
            : <></>
        }
            <Routes>
                <Route
                    // exact
                    path="/"
                    element= {UserSession.isAuthenticated() ? <></> : <SignIn/>}
                    // render={() => {
                    //     return UserSession.isAuthenticated() ? (
                    //         <Navigate to="/" />
                    //     ) : (
                    //         <Navigate to="/signin" />
                    //     )
                    // }}
                />

                {/* <Route path="/inventory_optimizer" element={<InventoryOptimizer />}></Route> */}
                {/* <Route path="warehouse/productivity" element={<BenchmarkProductivity />}></Route> */}
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
