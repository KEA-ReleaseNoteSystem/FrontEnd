import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../index.css'; // 스타일 파일 import

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    zIndex: '1000', // add a high zIndex value
},
content: {
    width: '70%',
    height: '70%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius:20,
    alignItems: 'center',
    position: 'relative', // make sure it's a positioned element
    zIndex: '1001', // it should be higher than overlay's zIndex to appear on top
}
};

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);
  }, []);

  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href="/"
  }

  if (isAuthenticated) {
    return (
        <>
          <button className="login-button" onClick={logOut}>로그아웃</button>
        </>
      );
  } else {
    return (
        <>
          <button className="login-button" onClick={openModal}>로그인</button>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="로그인"
          >
          </Modal>
        </>
      );
  }
};

export default LoginButton;
