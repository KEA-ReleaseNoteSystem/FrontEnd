import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top : 0px;
  margin-bottom : 5%;
  min-height: 400px;
  width: 30%;
  border-radius: 3px;
  background: ${color.backgroundLightest};
`;


export const IssuesCount = styled.span`
  text-transform: lowercase;
  ${font.size(13)};
`;

export const Issues = styled.div`
  height: 100%;
  padding: 0 5px;
`;
