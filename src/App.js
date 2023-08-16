import { useState, useEffect, useMemo } from "react";
import 'eventsource-polyfill'; 
// react-router components
import { Routes, Route, Navigate, useLocation, Router } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// Material Dashboard 2 React routes
import routes from "routes";

import EventSource from 'eventsource-polyfill';

import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';


// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import CreateRelease from "layouts/release/create";
import SocialLogin from "layouts/authentication/social-login";

import ViewRelease from "layouts/release/modify";
import { RecoilRoot ,useRecoilState} from "recoil";
import { projectIdState } from 'examples/Sidenav/ProjectIdAtom';
import Notification from "layouts/notifications/noticicateAlert"

import axios from "interceptor/TokenCheck.js";


export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  
  const [message, setMessage] = useState();
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // New state
  const token = localStorage.getItem("ACCESS_TOKEN");
  useEffect(() => { 
    if(token){
    setIsAuthenticated(true);
    setIsAuthChecked(true); // Set to true after checking
    }else{
      setIsAuthChecked(true);
    }
  }, [token]);

  

  useEffect(() => {
          let retryCount = 0;
          let sse;
  
          const maxRetries = 10;
          const retryInterval = 5000; // 5 seconds
  
          const initializeSSE = () => {
              const headers = {
                  'Authorization': `Bearer ${token}`
              };
  
              sse = new EventSourcePolyfill(`/api/project/${encodeURIComponent(projectId)}/notification-stream`, { headers });
  
              console.log("sse url: ", `/api/project/${encodeURIComponent(projectId)}/notification-stream`);
  
              sse.onmessage = (event) => {
                  console.log("onmessage", event.data);
                  console.log(event.data.includes("message"));
                  setMessage(event.data.includes("message") ? JSON.parse(event.data) : null);
              };

              sse.onerror = (error) => {
                  console.error("SSE failed:", error);
  
                  if (retryCount < maxRetries) {
                      console.log(`Retrying in ${retryInterval / 1000} seconds...`);
                      setTimeout(() => {
                          initializeSSE();
                          retryCount++;
                      }, retryInterval);
                  } else {
                      console.error("Max retries reached. Not reconnecting.");
                  }
  
                  sse.close();
              };
          };
  
          if (projectId && token) {
              initializeSSE();
          }
  
          return () => {
              if (sse) {
                  sse.close();
              }
          };
      }, [projectId, token]);
  
      // Rest of your component
  



  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );


  if (isAuthenticated === null) {
    return null;
  }

  const keepSessionAlive = async () => {
    try {
    
      await axios.post("/api/keepAlive",{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("로그인 유지 요청 성공.");
    } catch (error) {
      console.error("로그인 유지 요청 실패:", error);
      alert(token);
    }
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      // 로그인 상태일 때만 setInterval로 주기적으로 keepSessionAlive 함수 호출
      const intervalId = setInterval(keepSessionAlive, 3 * 60 * 1000); // 3분마다 호출
      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }
  }, [isAuthenticated, token]);


  return (
    
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Notification message = {message} projectId = {projectId}/>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="　　　Releasy"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
  
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/social-login" element={<SocialLogin />} />
        <Route
          path="/release/:releaseId"
          element={
              <ViewRelease />
          }
        />
      </Routes>

    </ThemeProvider>
   
  );
}