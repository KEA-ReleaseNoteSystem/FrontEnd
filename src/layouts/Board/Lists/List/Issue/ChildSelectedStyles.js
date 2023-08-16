import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { color, font, mixin } from 'shared/utils/styles';
import { Avatar } from 'shared/components';




export const ChildIssueList = styled.div`
  margin: 10px;
  background-color: ${props => props.selected ? '#e3f2fd' : '#FFFF'};
  padding: 10px;
  border-radius: 8px;
  max-height: 100px; 
  min-width: 420px; 
  box-shadow: 1.5px 1.5px 2px 1px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  ${mixin.clickable}
  @media (max-width: 1100px) {
    padding: 10px 8px;
  }
  &:hover {
    background: ${color.backgroundLight};
  }
  ${props =>
    props.isBeingDragged &&
    css`
      transform: rotate(3deg);
      box-shadow: 5px 10px 30px 0px rgba(9, 30, 66, 0.15);
    `}
`;

export const Title = styled.p`
  
  ${font.size(15)}
  @media (max-width: 1100px) {
    ${font.size(14.5)}
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Assignees = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
`;

export const AssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;


export const DeleteButton = styled.button`
position: absolute;
right: 70px;
transform: translateY(-40%);
font-size : 30px;

/* 배경 색은 없다. */
background-color: transparent; 
/* 아이콘은 회색 */
color: gray;
border: none;
cursor: pointer;
transition: color 0.3s ease-in-out;

/* 마우스를 올리면 빨간색으로 변경 */
&:hover {
  color: red;
}
`;
 