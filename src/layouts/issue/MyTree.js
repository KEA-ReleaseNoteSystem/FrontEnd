// MyTree.js
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import './tree.css';
import MDBox from 'components/MDBox';
import Card from '@mui/material/Card';
import MDTypography from "components/MDTypography";


function MyTree({ issue }) {
  console.log("tree issue :",issue)
  const [data, setData] = useState({
    name: 'Root',
    attributes: {
      id: 3,
      title: 'test_issue_title3',
      issueType: 'task',
      status: 'inprogress'
    },
    children: [
      {
        name: 'Child Node',
        attributes: {
          id: 2,
          title: '제목 수정2',
          issueType: 'story',
          status: 'inprogress'
        }
      }
    ]
  });

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getTree = async () => {
      try {
        const response = await axios.get(`/api/1/issues/tree/${issue.id}`);
        setData(response.data);
        setTranslate({ x: 220, y: 150 });
        console.log("data",data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    
      getTree();
   // Reset the refresh state after fetching the data
    }, [issue]);

  // Function to determine the class name based on the condition
 
const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
  const isRootNode = nodeDatum.attributes.id === issue.id;
  const nodeClass = isRootNode ? 'node__root' : nodeDatum.children ? 'node__branch' : 'node__leaf';
  const textClass = isRootNode ? 'rd3t-label__title' : 'rd3t-label__attributes';

  return (
    <g>
      <circle width="20" height="20" x="-10"
        r={10}
        className={nodeClass}  // CSS 클래스 추가
        style={{ fill: isRootNode ? 'blue' : 'skyblue' }}
        onClick={toggleNode}
      />
      <text
        x={15}
        y={-15}
        className={textClass}  // CSS 클래스 추가
        onClick={toggleNode}
      >
        {nodeDatum.name}
      </text>
      <text
        x={15}
        y={0}
        className={textClass}  // CSS 클래스 추가
        onClick={toggleNode}
      >
        Status: {nodeDatum.attributes.status}
      </text>
      <text
        x={15}
        y={15}
        className={textClass}  // CSS 클래스 추가
        onClick={toggleNode}
      >
        Type: {nodeDatum.attributes.issueType}
      </text>
    </g>
  );
};

  return (
    <div>
      <Card style={{ height: '20em', background: 'white' }}>
        <MDBox  mx={2}
          mt={-3}
          py={1.5}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          style={{ height: '50px'}}>
          <MDTypography variant="h6" color="white">
           트리 조회
          </MDTypography>
          </MDBox>
        <Tree
          data={data}
          orientation={'vertical'}   
          translate={translate} 
          renderCustomNodeElement={renderCustomNodeElement}  
          nodeSize={{ x: 200, y: 200 }}
        />
      </Card>
    </div>
  );
}

export default MyTree;
