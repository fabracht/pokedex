import React from 'react';
import styled from "@emotion/styled";

const StyledPokecardContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-items: flex-start;

  column-gap: 2px;
  row-gap: 10px;
  list-style-type: none;
  padding: 30px;
  background-color: yellow;
  width: 80%;
  // place-items: center;
  justify-content: center;
  border: 1px solid black;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 900px) {
    justify-content: center;
    align-items: center;
  }
  `;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  background-color: grey;
  width: 100%;
`;
export default function PokecardContainer(props) {
  return (
    <StyledContainer>
      <StyledPokecardContainer>{props.children}</StyledPokecardContainer>
    </StyledContainer>
  );
}
