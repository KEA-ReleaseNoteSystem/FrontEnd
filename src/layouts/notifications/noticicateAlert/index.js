/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";


import MDSnackbar from "components/MDSnackbar";
import { RecoilRoot ,useRecoilState} from "recoil";
import { projectIdState } from 'examples/Sidenav/ProjectIdAtom';


function Notifications({message , projectId}) {
  console.log("messagemessage",message);
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [notification, setNotification] = useState();
 


  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  // console.log("projectId",projectId);

  useEffect(() =>
   {
    
    if(message && message.message && (projectId == message.projectId)){
    console.log("message.projectId",message.projectId);
    setNotification(message.message);
    }else{
      setNotification();
    }

   },[message]);

   useEffect(() =>
   {
    console.log("notification",notification);
    if(notification && notification.includes("해결") ){
      openSuccessSB();
    }
    else if(notification &&  notification.includes("발행") ){
      openInfoSB();
    }
    else{
      closeSuccessSB();
      closeInfoSB();
    }

   },[message]);



  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="이슈 해결"
      content={notification}
      // dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="이슈 발행"
      content={notification}
      // dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content={notification}
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content={notification}
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <div>
    {notification !== undefined && renderSuccessSB}
    {notification !== undefined && renderInfoSB}
    {notification !== undefined && renderWarningSB}
    {notification !== undefined && renderErrorSB}
    </div>
  );
}

export default Notifications;