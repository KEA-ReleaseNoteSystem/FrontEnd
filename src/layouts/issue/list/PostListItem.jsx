import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`  width: calc(100% - 32px);  padding: 16px;
display: flex;
flex-direction: column;  align-items: flex-start;  justify-content: center;  border: 1px solid grey;  border-radius: 8px; cu  rsor: pointer; backgro  und: white;
:hover {
background: lightgrey;
}
`;

const TitleText = styled.p`  font-size: 20px;
font-weight: 500;
`;

function PostListItem(props){
    const{post,onClick} = props;
    console.log("post123",post)
    return(
        <Wrapper onClick={onClick}>
            <TitleText>{post.title}</TitleText>
        </Wrapper>
    )
}

export default PostListItem;
