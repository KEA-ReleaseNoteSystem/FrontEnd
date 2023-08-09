import { useEffect, useState } from "react";
import MDSnackbar from "components/MDSnackbar";

function Notifications({ message, projectId }) {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  useEffect(() => {

    if (message && message.projectId === projectId) {
      switch (message.notiType) {
        case "ISSUEDONE":
          setSuccessSB(true);
          break;
        case "ISSUECREATED": 
          setInfoSB(true);
          break;
        case "ISSUEALLOCATED":
          setWarningSB(true);
        case "ISSUEDELETED":
          setErrorSB(true);
        default:
          break;
      }
    }
  }, [message, projectId]);

  const closeAllSnackbars = () => {
    setSuccessSB(false);
    setInfoSB(false);
    setWarningSB(false);
    setErrorSB(false);
  };

  return (
    <>
      {successSB && (
        <MDSnackbar
          color="success"
          icon="check"
          title="이슈 해결"
          content={message.message}
          open={successSB}
          onClose={closeAllSnackbars}
          close={closeAllSnackbars}
          bgWhite
        />
      )}
      {infoSB && (
        <MDSnackbar
          icon="notifications"
          title="이슈 발행"
          content={message.message}
          open={infoSB}
          onClose={closeAllSnackbars}
          close={closeAllSnackbars}
        />
      )}
      {warningSB && (
        <MDSnackbar
          color="warning"
          icon="star"
          title="이슈 변경"
          content={message.message}
          open={warningSB}
          onClose={closeAllSnackbars}
          close={closeAllSnackbars}
          bgWhite
        />
      )}
      {errorSB && (
        <MDSnackbar
          color="error"
          icon="warning"
          title="이슈 삭제"
          content={message.message}
          open={errorSB}
          onClose={closeAllSnackbars}
          close={closeAllSnackbars}
          bgWhite
        />
      )}
    </>
  );
}

export default Notifications;
