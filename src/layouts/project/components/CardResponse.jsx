
import '../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Dropdown as ReactBootstrapDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import brain from '../../../assets/images/survey.png';
import Badge from 'react-bootstrap/Badge';
import 'animate.css';


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

const Card = ({ key, itemId, id, title, date ,startdate, enddate, currentdate}) => (
  <div className="col-lg-3A wow slideInUp" data-wow-delay="0.2s" >
  
      
  <img className="img-fluid" src={brain} alt="" style={{ width: '100%'}} />
  <div className="p-5" style={{ height: '185px', backgroundColor: '#F8F9FA', boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.2)' }}>
  {surveyStatus(startdate,enddate,currentdate)}<br></br>
      <h5 className="fw-bold  card-title">{title}</h5>
     
      <ReactBootstrapDropdown>
          <ReactBootstrapDropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-toggle">
          <span className="fas fa-ellipsis-v ellipsis-icon"></span>
          </ReactBootstrapDropdown.Toggle>
          <ReactBootstrapDropdown.Menu>

              <ReactBootstrapDropdown.Item  className="custom-dropdown-item" as={Link} to={`/survey-response-lookup/${encodeURIComponent(id)}`}>
                조회
              </ReactBootstrapDropdown.Item>
            
            </ReactBootstrapDropdown.Menu>
          </ReactBootstrapDropdown>
          <br/>
          
        <div className="card-content mb-5">
          
          <small className="me-3">
        
            <i className="far fa-user text-primary me-2" />
            {itemId} &nbsp;
       
            <i className=" far fa-calendar-alt text-primary me-2" />
            {date}
          </small>
         
        </div>
        
      </div>
    </div>

);

export default Card;