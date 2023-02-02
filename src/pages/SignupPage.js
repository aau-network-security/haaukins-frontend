import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertDescription,
  Text,
  Link,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaKey } from "react-icons/fa";
import Logo from "../components/Logo";
import { useSelector, useDispatch } from "react-redux";
import { signupTeam } from "../features/teams/teamSlice";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaKey = chakra(FaKey);

export default function SignupPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.team.loggedIn);
  const eventinfo = useSelector((state) => state.event.eventinfo);
  const error = useSelector((state) => state.team.error);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [reqDataState, setData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    secretKey: "",
  });

  const [ errState, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ ...reqDataState, ["eventTag"]: eventinfo.tag });
    if (errState.confirmPassword === "Password and Confirm Password does not match.") {
      return
    }

    let reqData = {
      email: reqDataState.email,
      username: reqDataState.username,
      password: reqDataState.password,
      confirmPassword: reqDataState.confirmPassword,
      secretKey: reqDataState.secretKey,
      eventTag: eventinfo.tag,
    };
    dispatch(signupTeam(reqData));
  };

  const changeHandler = (e) => {
    if (e.target.name === "username") {
      setData({ ...reqDataState, [e.target.name]: e.target.value.trim() });
    } else {
      setData({ ...reqDataState, [e.target.name]: e.target.value });
    }
    validateInput(e)
  };

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
   
      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;
   
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (reqDataState.confirmPassword && value !== reqDataState.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = reqDataState.confirmPassword ? "" : errState.confirmPassword;
          }
          break;
   
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (reqDataState.password && value !== reqDataState.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
   
        default:
          break;
      }
   
      return stateObj;
    });
  }

  if (loggedIn) {
    return <Navigate to="/challenges" />;
  }
  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="85vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Logo white="false" marginBottom="10px"></Logo>
        <Text
          marginBottom="10px"
          fontSize="30px"
          fontWeight="bold"
          color="#211a52"
        >
          Create a user
        </Text>
        {error.apiStatusCode === 401 ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Incorrect secret key</AlertDescription>
          </Alert>
        ) : error.axiosCode === "ERR_NETWORK" ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              Error connecting to daemon. Please contact an administrator
            </AlertDescription>
          </Alert>
        ) : error.apiStatusCode === 400 ? (
          <>
            { error.apiError.status === "team already exists" && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                User already exists
              </AlertDescription>
            </Alert> )}
            { error.apiError.status === "Error" && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                Fill out missing fields
              </AlertDescription>
            </Alert>
            )}
          </>
          
        ) :
         null
        }
        
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={changeHandler}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={changeHandler}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={changeHandler}
                    onBlur={validateInput}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                  
                </InputGroup>
                {errState.password && <Text color="#bf3d3d">{errState.password}</Text>}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    onChange={changeHandler}
                    onBlur={validateInput}
                  />
                  
                </InputGroup>
                {errState.confirmPassword && <Text color="#bf3d3d">{errState.confirmPassword}</Text>}
              </FormControl>
              {eventinfo.secret && (
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaKey color="gray.300" />}
                    />
                    <Input
                      type="password"
                      name="secretKey"
                      placeholder="Secret key"
                      onChange={changeHandler}
                    />
                  </InputGroup>
                </FormControl>
              )}

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                backgroundColor="#211a52"
                color="white"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
        <Text>
          By registering a user you accept the {" "}
          <Link
            href="http://danishcybersecurityclusters.dk/"
            target="_blank"
            color="#54616e"
          >
            Privacy Policy
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
}
