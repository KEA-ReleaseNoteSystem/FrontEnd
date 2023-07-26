import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/images/Logo.png';
import releasy_logo from '../../../assets/images/releasy_logo.png';

import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import LoginButton from './LoginButton';
import './style/navigation.css';
function NavigationBar() {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);
  }, []);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href="/"
  }
  return (
    <Navbar className="navbar-wrapper navbar-dark bg-dark" expand="lg" >
      <Container fluid>
        <Navbar.Brand as={Link} to="/home/manage-project">
        <div className="navbar-brand-image-wrapper">
            <img
              alt=""
              src={releasy_logo}
              className="navbar-brand-image"
            />
          </div> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/home/project/new" // /home/project/new 으로 수정 예정
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              프로젝트 생성
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/home/manage-project"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
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
            >
              마이페이지
            </Nav.Link>
            {isAuthenticated ? (
              <Nav.Link onClick={logOut} style={{ cursor: 'pointer' }}>
                로그아웃
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
              >
                로그인
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
