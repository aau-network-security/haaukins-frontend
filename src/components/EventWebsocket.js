import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { BASE_URL } from "../api/client";
import { fetchEventInfo } from "../features/events/eventSlice";
import { fetchExercises } from "../features/exercises/exerciseSlice";
import { fetchTeam } from "../features/teams/teamSlice";

function EventWebsocket() {
    const dispatch = useDispatch()

    var httpProtocol = "http://";
    var wsProtocol = "ws://";
    if (window.location.protocol === "https:") {
        httpProtocol = "https://";
        wsProtocol = "wss://";
    }
    var wsUrl = BASE_URL.replace(httpProtocol, wsProtocol) + "ws";
    const [webSocket, setWebSocket] = useState(null);
    useEffect(() => {
        setWebSocket(new WebSocket(wsUrl))
    },[])

    useEffect(() => {
        if (webSocket !== null) {
          webSocket.onopen = (event) => {
            let tokenObject = {
              token: localStorage.getItem("token"),
            }
            webSocket.send(JSON.stringify(tokenObject))
          };
      
          webSocket.onmessage = function (event) {
            try {
              let command = event.data
              console.log("got command: " + command)
              if (command === "updateChallenges") {
                dispatch(fetchExercises())
              } else if (command === "updateTeam") {
                dispatch(fetchTeam())
              } else if (command === "updateEventInfo") {
                dispatch(fetchEventInfo())
              }
            }
            catch(e) {
              console.log("could not pass websocket message as JSON. Got message: ", event.data)
            }
            
          };
      
          webSocket.onclose = function (event) {
            console.log("closing websocket")
          };
      
          webSocket.onerror = function (err) {
            console.log('Socket encountered error: ', err.message, 'Closing socket');
            webSocket.close();
          };
      
          return () => {
             webSocket.close();
          };
        }
      }, [webSocket]);

    return <Outlet />;
}

export default EventWebsocket;
