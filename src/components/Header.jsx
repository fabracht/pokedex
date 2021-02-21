import styled from "@emotion/styled";
import React from 'react';

const StyledHeader = styled.header`
  display: flex;
  text-align: center;
  flex-direction: column;
`;


export default function Header(props) {
  return (
    <StyledHeader>
      {props.children}
    </StyledHeader>
  );
}
