// MyTree.js
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import './tree.css';
import { useNavigate } from 'react-router-dom';

import MDBox from 'components/MDBox';
import Card from '@mui/material/Card';
import MDTypography from "components/MDTypography";
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../examples/Sidenav/ProjectIdAtom';


function releaseTree() {
  
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(true);
  const [projectId, setProjectId] = useRecoilState(projectIdState);

const handleNodeTextClick = (event, id,active) => {
  // Prevent the toggleNode event from firing
  event.stopPropagation();

  if(active != false && id != null){
  // Go to the release link
  navigate(`/release/${id}`);}
};

  const [data, setData] = useState();


  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getTree = async () => {
      try {
        const response = await axios.get(`/api/${encodeURIComponent(projectId)}/releases/tree`);
        {response.data.data == null ? setIsLoading(true): setIsLoading(false)};
        const id = null ;
        // 빈 루트 노드를 만듭니다
        const rootNode = { name: "Root", attributes : [id] ,children: [] ,active : false};
  
        // 각 버전별 상위 노드를 저장하는 맵을 만듭니다
        const versionMap = new Map();
  
        response.data.data.forEach(node => {
          // 버전의 첫 번째 숫자를 가져옵니다
          const firstVersionDigit = node.name[0];
  
          if (!versionMap.has(firstVersionDigit)) {
            // 아직 이 버전의 상위 노드가 없다면 새로 만듭니다
            const newParentNode = { name: firstVersionDigit, attributes : [id] , children: [], active: false};
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
    const version = nodeDatum.name;
    
    // If this is the root node or the first digit node, make the color black
    if (version === "Root" || version.length === 1) {
      return (
        <g>
          <circle
            width="20"
            height="20"
            x="-10"
            r={10}
            style={{ fill: "black" }}
            onClick={toggleNode}
          />
          <text x={15} y={-15} className="node-text" onClick={(event) => handleNodeTextClick(event, nodeDatum.attributes.id)}>
            {nodeDatum.name}
          </text>
        </g>
      );
    }
  
    // Otherwise, determine the shape and color based on the version
    const [major, minor, patch] = version.split('.').map(Number);
    let color;
    let shape;
    if (nodeDatum.attributes.active === false) {
      shape = (
        <g>
          <line x1="-10" y1="-10" x2="10" y2="10" stroke={"red"} strokeWidth="5"  onClick={toggleNode}/>
          <line x1="-10" y1="10" x2="10" y2="-10" stroke={"red"} strokeWidth="5"  onClick={toggleNode}/>
        </g>
      );
    }
    else if (minor === 0 && patch === 0) {
      color = '#1565C0'; // Major version - Blue
      shape = <circle width="20" height="20" x="-10" r={10} style={{ fill: color }} onClick={toggleNode} />;
    } else if (patch !== 0) {
      color = '#64DD17'; // Patch version - Green
       shape = <polygon points="10,10 -10,10 0,-10" style={{ fill: color }} onClick={toggleNode} />;
    } else if (minor !== 0) {
      color = '#FF7043'; // Minor version - Orange
      shape = <rect x="-10" y="-10" width="20" height="20" style={{ fill: color }} onClick={toggleNode} />;
    } else {
      color = 'gray'; // Other versions
      shape = <circle width="20" height="20" x="-10" r={10} style={{ fill: color }} onClick={toggleNode} />;
    }
  
    return (
      <g>
        {shape}
        <text x={15} y={-15} className="node-text" onClick={(event) => handleNodeTextClick(event, nodeDatum.attributes.id,nodeDatum.attributes.active)}>
          {nodeDatum.name}
        </text>
      </g>
    );
  };


  
  return (
    <div>
      <Card style={{ height: '30em', width : '100vm',background: 'white' }}>
      {!isLoading ? (
        <Tree
          data={data}
          orientation={'vertical'}   
          translate={translate} 
          renderCustomNodeElement={renderCustomNodeElement}  
          nodeSize={{ x: 200, y: 200 }}
        />) : ("There is no release note")
      }

      </Card>
    </div>
  );
}

export default releaseTree;
