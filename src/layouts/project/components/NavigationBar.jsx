import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/images/Logo.png';
import releasy_logo from '../../../assets/images/releasy_logo.png';

import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import LoginButton from './LoginButton';

function NavigationBar() {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <>
      <Navbar
        bg="white"
        variant="blue"
        style={{
          height: '60px',
          borderBottom: '1px solid #ADD8E6',
          fontSize: '15px',
          padding: '10px'
        }}
      >
        
          <Navbar.Brand as={Link} to="/home/manage-project">
            <img
              alt=""
              src={releasy_logo}
              width="105"
              height="45"
              className="d-inline-block align-top"
            /> </Navbar.Brand> 
            {/* {' '}
            Releasy
          </Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/home/project/new" // /home/project/new 으로 수정 예정
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              style={{
                color: hovered === 0 || currentPath === '/createsurvey' ? '#A0D3F9' : 'inherit',
                borderBottom: currentPath === '/createsurvey' ? '2px solid #A0D3F9' : 'none',
              }}
            >
              프로젝트 생성
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/managesurvey"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              style={{
                color: hovered === 1 || currentPath === '/managesurvey' ? '#A0D3F9' : 'inherit',
                borderBottom: currentPath === '/managesurvey' ? '2px solid #A0D3F9' : 'none',
              }}
            >
              프로젝트 관리
            </Nav.Link>
            
          </Nav>
          <Nav className="ml-auto">
          <Nav.Link
              as={Link}
              to="/home/mypage"
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              style={{
                color: hovered === 2 || currentPath === '/mypage' ? '#A0D3F9' : 'inherit',
                borderBottom: currentPath === '/mypage' ? '2px solid #A0D3F9' : 'none',
              }}
            >
              My Page
            </Nav.Link>
            <LoginButton />
          </Nav>
      </Navbar>
    </>
  );
}

export default NavigationBar;
