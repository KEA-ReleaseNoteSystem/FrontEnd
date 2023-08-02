// MyTree.js
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import './tree.css';
import MDBox from 'components/MDBox';
import Card from '@mui/material/Card';
import MDTypography from "components/MDTypography";


function releaseTree() {
  
  const [data, setData] = useState({
    name: 'Root',
    attributes: {
      id: 3,
      vi: 'test_issue_title3',
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

;

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getTree = async () => {
      try {
        const response = await axios.get(`/api/1/releases/tree`);
  
        // 빈 루트 노드를 만듭니다
        const rootNode = { name: "Root", children: [] };
  
        // 각 버전별 상위 노드를 저장하는 맵을 만듭니다
        const versionMap = new Map();
  
        response.data.forEach(node => {
          // 버전의 첫 번째 숫자를 가져옵니다
          const firstVersionDigit = node.name[0];
  
          if (!versionMap.has(firstVersionDigit)) {
            // 아직 이 버전의 상위 노드가 없다면 새로 만듭니다
            const newParentNode = { name: firstVersionDigit, children: [] };
            versionMap.set(firstVersionDigit, newParentNode);
  
            // 이 새 상위 노드를 루트 노드의 자식으로 추가합니다
            rootNode.children.push(newParentNode);
          }
  
          // 이 버전의 상위 노드를 가져옵니다
          const parentNode = versionMap.get(firstVersionDigit);
  
          // 현재 노드를 상위 노드의 자식으로 추가합니다
          parentNode.children.push(node);
        });
  
        setData(rootNode);
        setTranslate({ x: 700, y: 150 });
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getTree();
  }, []);

console.log("data",data);



  // Function to determine the class name based on the condition
 
const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {

  return (
    <g>
      <circle width="20" height="20" x="-10"
        r={10}
        // className={nodeClass}  // CSS 클래스 추가
        style={{ fill:  'skyblue' }}
        onClick={toggleNode}
      />
      <text
        x={15}
        y={-15}
        // className={textClass}  // CSS 클래스 추가
        onClick={toggleNode}
      >
        {nodeDatum.version}
      </text>

    </g>
  );
};

  return (
    <div>
      <Card style={{ height: '30em', width : '100vm',background: 'white' }}>
        <Tree
          data={data}
          orientation={'vertical'}   
          translate={translate} 
       
          //renderCustomNodeElement={renderCustomNodeElement}  
          nodeSize={{ x: 200, y: 200 }}
        />
      </Card>
    </div>
  );
}

export default releaseTree;
