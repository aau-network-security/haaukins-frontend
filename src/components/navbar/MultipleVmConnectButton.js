import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";

function MultipleVmConnectBotton() {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const eventInfo = useSelector((state) => state.event.eventinfo);
  const scrolledToTop = useSelector((state) => state.generic.scrolledToTop);
  const [connectionUrls, setConnectionUrls] = useState([]);

  useEffect(() => {
    let host = loggedInTeam.lab.parentAgent.url.split(":")[0];
    let baseurl = "http://" + eventInfo.tag + "." + host;
    if (loggedInTeam.lab.parentAgent.tls) {
      baseurl = "https://" + eventInfo.tag + "." + host;
    }
    let payload = new URLSearchParams({
      username: loggedInTeam.lab.labInfo.guacCreds.username,
      password: loggedInTeam.lab.labInfo.guacCreds.password,
    });
    fetch(baseurl + "/guacamole/api/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    })
      .then(function (res) {
        if (!res.ok) {
          console.log("error getting guacamole token");
          throw new Error("HTTP status " + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        fetch(
          baseurl +
            "/guacamole/api/session/data/mysql/connectionGroups/ROOT/tree",
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,da-DK;q=0.8,da;q=0.7,es;q=0.6",
              "cache-control": "no-cache",
              "guacamole-token": data.authToken,
              pragma: "no-cache",
            },
            referrer: baseurl + "/guacamole/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
          }
        )
          .then(function (res) {
            if (!res.ok) {
              console.log("error getting guacamole token");
              throw new Error("HTTP status " + res.status);
            }
            return res.json();
          })
          .then(function (data) {
            let connectionUrls = [];
            setConnectionUrls(connectionUrls);
            data.childConnections.forEach((connection) => {
              console.log(connection);
              let clientId =
                connection.identifier + "\0" + "c" + "\0" + "mysql";
              let base64clientId = Buffer.from(clientId).toString("base64");
              console.log(base64clientId);
              let connectionUrl =
                baseurl +
                "/guaclogin" +
                "?username=" +
                loggedInTeam.lab.labInfo.guacCreds.username +
                "&password=" +
                loggedInTeam.lab.labInfo.guacCreds.password +
                "&vid=" +
                base64clientId;

              setConnectionUrls((connectionUrls) => [
                ...connectionUrls,
                connectionUrl,
              ]);
            });
          });
      });
  }, [loggedInTeam]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        backgroundColor={scrolledToTop ? "#54616e" : "#dfdfe3"}
        color={scrolledToTop ? "#dfdfe3" : "#54616e"}
        rightIcon={<FaChevronDown />}
        _hover={
          scrolledToTop
            ? { backgroundColor: "#a9b3bc" }
            : { backgroundColor: "#c8c8d0" }
        }
      >
        <Text>Connect to lab</Text>
      </MenuButton>
      <MenuList>
        {Object.entries(connectionUrls).map(([key, connectionUrl]) => (
          <Link
            href={connectionUrl}
            target="_blank"
            _hover={{ textDecor: "none" }}
            key={key}
          >
            <MenuItem >
              <Text>VM {Number(key) + 1}</Text>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}

export default MultipleVmConnectBotton;
