import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInTeam } from "./features/teams/teamSlice";
import ProfilePage from "./pages/ProfilePage";
import ChallengesPage from "./pages/ChallengesPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import ScoreBoardPage from "./pages/ScoreBoardPage";
import FaqPage from "./pages/FaqPage";
import { Flex } from "@chakra-ui/react";
import { BASE_URL } from "./api/client";
import { useFetch } from "react-async";
import { Buffer } from "buffer";
import EventNotFoundPage from "./pages/EventNotFoundPage";
import { setEventInfo } from "./features/events/eventSlice";
import EventWebsocket from "./components/EventWebsocket";
import HostsPage from "./pages/HostsPage";
import HintsPage from "./pages/HintsPage";
function AppRouter() {
  const dispatch = useDispatch();
  let [ publicScoreboard, setPublicScoreboard ] = useState(false) //Should be from redux state
  


  const getUsernameFromToken = (token) => {
    try {
      let tokenPayload = token.split(".")[1];

      const decoded = JSON.parse(Buffer.from(tokenPayload, "base64"));
      return decoded.sub;
    } catch (error) {
      return;
    }
  };

  const overrideAuth = false;

  const AuthWrapper = () => {
    let token = localStorage.getItem("token");
    // Thunk will return error if it cannot pass the value as json
    let user = getUsernameFromToken(token);
    let endpoint = "teams/self";
    const location = useLocation();
    const { data, error } = useFetch(BASE_URL + endpoint, {
      headers: {
        Authorization: token,
      },
    });
    if (overrideAuth) {
      return <Outlet />;
    }
    if (error) {
      localStorage.removeItem('token')
      if (location.pathname === "/") {
        return <HomePage />;
      } else {
        return <Navigate to="/login" replace />;
      }
    }
    if (data) {
      data.json().then((data) => {
        dispatch(setLoggedInTeam(data));
      }).catch((err) => {})
      return <Outlet />;
    }
  };

  const GetEventWrapper = () => {
    let host = window.location.host;
    let eventTag = host.split('.')[0]
    let endpoint = eventTag;

    
    const { data, error } = useFetch(BASE_URL + endpoint);
    if (error) {
      return <EventNotFoundPage/>;
    }
    if (data) {
      data.json().then((data) => {
        dispatch(setEventInfo(data));
        setPublicScoreboard(data.eventinfo.publicScoreboard)
      });
      return <Outlet />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GetEventWrapper />}>
          <Route
            element={
              <>
                <Navbar />
                <Flex w="100%" h="100%" overflowX={"auto"}>
                  <Outlet />
                </Flex>
                <Footer />
              </>
            }
          >
            
            
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            {/* <Route path="teams" element={<TeamsPage />} /> */}
            {publicScoreboard && (
              <Route path="scoreboard" element={<ScoreBoardPage />} />
            )}

            <Route element={<AuthWrapper />}>
              <Route element={<EventWebsocket />} >
                <Route path="" element={<HomePage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="hints" element={<HintsPage />} />
                <Route path="challenges" element={<ChallengesPage />} />
                <Route path="hosts" element={<HostsPage />} />
                {!publicScoreboard && (
                  <Route path="scoreboard" element={<ScoreBoardPage />} />
                )}
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
