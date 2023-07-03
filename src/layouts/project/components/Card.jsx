import React, { useState } from 'react';
import '../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown as ReactBootstrapDropdown } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import brain from '../../../assets/images/survey.png';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import 'animate.css';



const Card = ({ key, itemId, id, title, date ,startdate, enddate, currentdate}) => {
  console.log("시작일",startdate);
  const [isCopied, setIsCopied] = useState(false);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const handleDelete = () => {
    console.log(`/api/survey/${encodeURIComponent(id)}`)
    axios.delete(`/api/survey/${encodeURIComponent(id)}`, { //   생성한 설문 가져오는 요청
      headers: {
        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
      }
    }).then(response => {
      // 삭제 성공 후 실행할 코드를 작성합니다.
      console.log('삭제 성공');
      window.location.reload();
    })
      .catch(error => {
        // 삭제 실패 후 실행할 코드를 작성합니다.
        console.error('삭제 실패', error);
      });
  };


  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Hide after 3 seconds
  };
 

  return (
    <div className="col-lg-3A wow slideInUp" data-wow-delay="0.2s" >
        
     <div style={{ position: 'relative' }}>
        {isCopied && (
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '999',
              background: '#000',
              color: '#fff',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            클립보드 복사완료
          </div>
        )}
         <Link to={`/modifysurvey/${encodeURIComponent(id)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <img className="img-fluid" src={brain} alt="" style={{ width: '100%' }} /></Link>

      
      <div className="p-5" style={{ height: '200px',width: '100%', backgroundColor: '#F8F9FA', boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.2)' }}>
      {surveyStatus(startdate,enddate,currentdate)}<br></br>
        <h5 className="fw-bold  card-title">
        <Link to={`/modifysurvey/${encodeURIComponent(id)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {title}</Link> </h5>
        
        <ReactBootstrapDropdown>
          <ReactBootstrapDropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-toggle">
            <span className="fas fa-ellipsis-v ellipsis-icon"></span>
          </ReactBootstrapDropdown.Toggle>
          <ReactBootstrapDropdown.Menu  style={{ maxHeight: '300px', overflowY: 'no' }}>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" as={Link} to={{
              pathname: `/surveyURL/${encodeURIComponent(id)}`,
              state: { surveyId: id }
            }}>
              공유
            </ReactBootstrapDropdown.Item>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" as={Link} to={`/managesurvey/survey/${encodeURIComponent(id)}/statistic`}>
              통계
            </ReactBootstrapDropdown.Item>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" as={Link} to={{
              pathname: `/modifysurvey/${encodeURIComponent(id)}`,
              state: { surveyId: id }
            }}>
              수정
            </ReactBootstrapDropdown.Item>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" onClick={handleDelete}>삭제</ReactBootstrapDropdown.Item>
            
          </ReactBootstrapDropdown.Menu>
        </ReactBootstrapDropdown>
        <br />


            <i className="far fa-user text-primary me-1"/>
            <a style={{fontSize:'15px'}}>{itemId}</a> &nbsp;
          
            
            <i className=" far fa-calendar-alt text-primary me-" />
            <a style={{fontSize:'15px'}}>{date}</a>      
        </div>
      </div>
    </div>
  
  );
};

function surveyStatus(startdate, enddate, currentdate) {
  // parse startdate and enddate to ensure they are in correct format
  let parsedStart = new Date(startdate);
  let parsedEnd = new Date(enddate);

  if(currentdate >= parsedStart && currentdate <= parsedEnd) {
    return ( <Badge bg="primary" style={{ fontSize: '12px' }}>
   '진행중'
    </Badge>);
  } else {
    return (<Badge bg="danger" style={{ fontSize: '12px' }}>
    '종료'
     </Badge>);
  }
}

export default Card;
