import React from 'react';
import { TiArrowRightOutline } from "react-icons/ti";
import styled from "@emotion/styled";

const StyledRightArrow = styled.div`
    z-index: 50;
    cursor: pointer;
`;

export default function RightArrow(props) {
    return (<StyledRightArrow onClick={props.handleRightArrow}>
        <TiArrowRightOutline />
    </StyledRightArrow>);
}
