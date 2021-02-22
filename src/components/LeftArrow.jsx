import React from 'react';
import { TiArrowLeftOutline } from "react-icons/ti";
import styled from "@emotion/styled";

const StyledLeftArrow = styled.div`
    z-index: 50;
    cursor: pointer;
`;
export default function LeftArrow(props) {

    return (
        <StyledLeftArrow onClick={props.handleLeftArrow}>
            <TiArrowLeftOutline />
        </StyledLeftArrow>
    );
}
