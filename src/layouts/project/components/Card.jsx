import React, { useState } from 'react';
import '../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown as ReactBootstrapDropdown } from 'react-bootstrap';
import { Link , useNavigate} from 'react-router-dom';
import proj from '../../../assets/images/survey.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import 'animate.css';



const Card = ({ key, itemId, id, title, pmname, date, status, startdate }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const token = localStorage.getItem('ACCESS_TOKEN');
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    handleDelete();
  };
  const navigate = useNavigate();

  const handleClick = () => {
      navigate('/PM', {
        state: {
            id:id
        }}
        )
  };
  const handleDelete = () => {
    axios.delete(`/api/project`, { //   생성한 설문 가져오는 요청
      headers: {
        Authorization: `Bearer ${token}`,
        // JWT 토큰을 헤더에 추가합니다.
      },
      data: {
        id: id
      }
    })
      .then(response => {
        // 삭제 성공 후 실행할 코드를 작성합니다.
        console.log('삭제 성공');
        alert(response.data.message);
        window.location.reload();
      })
      .catch(error => {
        // 삭제 실패 후 실행할 코드를 작성합니다.
        console.error('삭제 실패', error);
      });
  };
  
  return (
    <div className="col-lg-3A wow slideInUp" data-wow-delay="0.2s" >

      <div style={{ position: 'relative' }}>
        <Link to={`/dashboard`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img className="img-fluid" src={proj} alt="" style={{ width: '100%' }} /></Link>

        <div className="p-5" style={{ height: '200px', width: '100%', backgroundColor: '#F8F9FA', boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.2)' }}>
          {projectStatus(status)}<br></br>
          <h5 className="fw-bold  card-title">
            <Link to={`/dashboard`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {title}</Link> </h5>

          <ReactBootstrapDropdown>
            <ReactBootstrapDropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-info dropdown-toggle">
              <span className="fas fa-ellipsis-v ellipsis-icon"></span>
            </ReactBootstrapDropdown.Toggle>
            <ReactBootstrapDropdown.Menu style={{ maxHeight: '300px', overflowY: 'no' }}>
              <ReactBootstrapDropdown.Item className="custom-dropdown-item" as={Link} to={`/managesurvey/survey/${encodeURIComponent(id)}/statistic`}>
                릴리즈노트 조회
              </ReactBootstrapDropdown.Item>
              <ReactBootstrapDropdown.Item className="custom-dropdown-item" onClick={handleClick}>
                  수정
              </ReactBootstrapDropdown.Item>
              <ReactBootstrapDropdown.Item
                className="custom-dropdown-item"
                onClick={() => setShowConfirmation(true)}
              >
                삭제
              </ReactBootstrapDropdown.Item>
            </ReactBootstrapDropdown.Menu>
          </ReactBootstrapDropdown>

          <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>삭제 확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>정말로 삭제하시겠습니까?</p>
              <p style={{ color: "red", fontSize: "15px" }}>안의 릴리즈 노트 내용과 정보가 모두 함께 삭제됩니다.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                취소
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                삭제
              </Button>
            </Modal.Footer>
          </Modal>
          <br />
          <i className="far fa-user text-primary me-2" style={{ marginRight: "15px" }} />
          {pmname}

          <i className=" far fa-calendar-alt text-primary me-" style={{ paddingLeft: "10px" }} />
          <a style={{ fontSize: '17px' }}>{date}</a>
        </div>
      </div>
    </div>

  );
};

function projectStatus(status) {
  if (status == "In-progress") {
    return (<Badge bg="primary" style={{ fontSize: '12px' }}>
      '진행중'
    </Badge>);
  }
  else if (status == "Completed") {
    return (<Badge bg="success" style={{ fontSize: '12px' }}>
      '완료'
    </Badge>);
  }
  else if (status == "Stopped") {
    return (<Badge bg="danger" style={{ fontSize: '12px' }}>
      '중단함'
    </Badge>);
  }
  else {
    return (<Badge bg="warning" style={{ fontSize: '12px' }}>
      '시작 전'
    </Badge>);
  }
}

export default Card;
