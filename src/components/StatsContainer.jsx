import React from 'react';
import styled from "@emotion/styled";
import { colorWheel } from '../utils/colorWheel';

export const StyledStatsContainer = styled.div`
    // width: 80%;
    display: flex;
    @media(max-width: 500px) {
        position: relative;
        // width: 100%;
        // left: -10%;
    }
    `;
export const StatsList = styled.ul`
    padding: 0;
    list-style-type: none;
    align-items: flex-end;
    display: flex;
    column-gap: 5px;
    height: 250px;
    border: 1px solid rgba(0,0,0, 0.7);
    border-radius: 10px;
    padding: 10px;
    background-color: ${colorWheel.grey};
    @media(max-width: 500px) {
        height: 100%;
        padding: 5px;
    }
    `;
export const StatsListItem = styled.li`
    min-width: 60px;
    text-align: center;
    display: flex;
    height: 100%;
    place-content: flex-end;
    flex-direction: column;
    border: 1px solid black;
    background-color: white;
    @media(max-width: 500px) {
        min-width: 40px;
    }
    `;
export const Statsname = styled.p`
    text-transform: capitalize;
    height: 30px;
    @media(max-width: 500px) {
        font-size: 10px;
        word-wrap: break-word;
    }
`;
export const Gauge = styled.div`
    margin: 0 auto;
    width: 90%;
    height: ${props => props.height ? props.height : "1px"};
    background-color: red;
    @media(max-width: 500px) {
        font-size: 14px;
        width: 95%;
    }
`;

// (hp/atk/def/special-atk/special-def/speed)
export function StatsContainer(props) {
    return (<StyledStatsContainer>
        <StatsList>
            {props.stats ? props.stats.map((el, i) => {
                return <StatsListItem key={`${el}-${i}`}>
                    <Gauge height={`${Number.parseInt(el.statValue)}px`}>{`${el.statValue}`}</Gauge>
                    <Statsname>{el.name}</Statsname>
                </StatsListItem>;
            }) : null}
        </StatsList>
    </StyledStatsContainer>);
}
