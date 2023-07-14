
import '../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Dropdown as ReactBootstrapDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import brain from '../../../assets/images/survey.png';
import Badge from 'react-bootstrap/Badge';
import 'animate.css';


function projectStatus(status) {
  if(status == "In-progress") {
    return ( <Badge bg="primary" style={{ fontSize: '12px' }}>
   '진행중'
    </Badge>);
  } 
  else if(status == "Completed") {
    return ( <Badge bg="success" style={{ fontSize: '12px' }}>
   '완료'
    </Badge>);
  }
  if(status == "Stopped") {
    return ( <Badge bg="danger" style={{ fontSize: '12px' }}>
   '중단함'
    </Badge>);
  } 
  else {
    return (<Badge bg="warning" style={{ fontSize: '12px' }}>
    '시작 전'
     </Badge>);
  }
}

const Card = ({ key, itemId, id, title,pmname, status, date}) => (
  <div className="col-lg-3A wow slideInUp" data-wow-delay="0.2s" >
  
      
  <img className="img-fluid" src={brain} alt="" style={{ width: '100%'}} />
  <div className="p-5" style={{ height: '200px', backgroundColor: '#F8F9FA', boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.2)' }}>
  {projectStatus(status)}<br></br>
      <h5 className="fw-bold  card-title">{title}</h5>
     
      <ReactBootstrapDropdown>
          <ReactBootstrapDropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-info dropdown-toggle">
          <span className="fas fa-ellipsis-v ellipsis-icon"></span>
          </ReactBootstrapDropdown.Toggle>
          <ReactBootstrapDropdown.Menu>

              <ReactBootstrapDropdown.Item  className="custom-dropdown-item" as={Link} to={`/survey-response-lookup/${encodeURIComponent(id)}`}>
                릴리즈 노트 조회
              </ReactBootstrapDropdown.Item>
            
            </ReactBootstrapDropdown.Menu>
          </ReactBootstrapDropdown>
          <br/>
            <i className="far fa-user text-primary me-2"/>
            {pmname}
            <i className=" far fa-calendar-alt text-primary me-" style={{paddingLeft:"10px"}}/>
            <a style={{fontSize:'17px'}}>{date}</a>     

        
      </div>
    </div>

);

export default Card;