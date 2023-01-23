import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./features/users/userSlice";
import ProfilePage from './pages/ProfilePage'
import ChallengesPage from './pages/ChallengesPage'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer';
import SignupPage from './pages/SignupPage';
import ScoreBoardPage from './pages/ScoreBoardPage';
import TeamsPage from './pages/TeamsPage';
import LabPage from './pages/LabPage'
import FaqPage from './pages/FaqPage';
import { Flex } from '@chakra-ui/react'
import { BASE_URL } from './api/client'
import { useFetch } from 'react-async'
import { Buffer } from 'buffer'
function AppRouter() {
    const dispatch = useDispatch()

    const getUsernameFromToken = (token) => {
        try {            
            let tokenPayload = token.split('.')[1]         
            
            const decoded = JSON.parse(Buffer.from(tokenPayload, 'base64'))
            return decoded.sub
        }
        catch (error) {
            return
        }
    }

    const AuthWrapper = () => {    
        let token = localStorage.getItem('token')
        // Thunk will return error if it cannot pass the value as json
        let user = getUsernameFromToken(token)
        let endpoint = "users/" + user

        const { data, error } = useFetch(BASE_URL + endpoint, {
            headers: {
                Authorization: token
            }
        })
        if (error) {
            return <Navigate to="/login" replace />
        }
        if (data) {
            data.json().then(data => {
                dispatch(setLoggedInUser(data))
            })
            return <Outlet />
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element= {
                    <>
                        <Navbar/>
                        <Flex w="100%" overflowX={"auto"}>
                            <Outlet/>
                        </Flex>
                        <Footer/>
                    </>
                }>
                <Route path="" element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignupPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="challenges" element={<ChallengesPage />} />
                {/* <Route path="teams" element={<TeamsPage />} /> */}
                <Route path="scoreboard" element={<ScoreBoardPage />} />
                <Route path="lab" element={<LabPage />} />
                <Route path="faq" element={<FaqPage />} />
                    <Route element={<AuthWrapper />}>
                            {/* <Route path="" element={<HomePage />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="challenges" element={<ChallengesPage />} /> */}
                    </Route>                        
                </Route>  
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter;
