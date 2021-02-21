import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { fillZeroes } from "../utils/fillZeroes";
import { RiForbid2Line } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import loadingLogo from "../assets/loadingLogo.svg";


const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 10%;
    left: 15%;
    width: 70%;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
`;

const LeftSide = styled.div`
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    `;
const RightSide = styled.div`
    width: 50%;
`;

const StyledStatsTitle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 2rem;
    text-transform: capitalize;
`;

const StyledDescriptionDiv = styled.div`
    max-width: 80%;
    font-size: 2rem;
    `;

const StyledStatsContainer = styled.div`
    width: 80%;
    display: flex;
    `;
const StatsList = styled.ul`
    padding: 0;
    list-style-type: none;
    align-items: flex-end;
    display: flex;
    column-gap: 5px;
    height: 250px;
    border: 1px solid rgba(0,0,0, 0.7);
    border-radius: 10px;
    padding: 10px;
    background-color: rgba(10, 10, 10, 0.9);
    `;
const StatsListItem = styled.li`
    min-width: 60px;
    text-align: center;
    display: flex;
    height: 100%;
    place-content: flex-end;
    flex-direction: column;
    border: 1px solid black;
    background-color: white;
    `;
const Statsname = styled.p`
    text-transform: capitalize;
    height: 30px;
`;
const Gauge = styled.div`
    margin: 0 auto;
    width: 90%;
    height: ${props => props.height ? props.height : "1px"};
    background-color: red;
`;

const CloseButtonDiv = styled.div`
    justify-self: flex-end;
    text-align: right;
    font-size: 3rem;
`;

// (hp/atk/def/special-atk/special-def/speed)
export default function PokemonInfoPage(props) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log(props.abilities);
        return () => {

        };
    }, []);

    return (
        <StyledContainer>
            <StyledStatsTitle>
                <h2>{props.name} {`${fillZeroes(props.pokeId)}`}</h2>
            </StyledStatsTitle>
            <LeftSide>
                {props.image ? <img src={loading ? loadingLogo : `${props.image}`} alt={`${props.name}`} width="100%" /> : <RiForbid2Line fontSize="8rem" />}
                <ul>
                    {props.abilities ? props.abilities.map((el, i) => <li key={`${el.name}-${i}`}>{el.name}</li>) : null}
                </ul>
            </LeftSide>
            <RightSide>
                <StyledDescriptionDiv>
                    <p>Its appearance changes depending on where it evolved. The materials on hand become a part of its body</p>
                </StyledDescriptionDiv>
                <StyledStatsContainer>
                    <StatsList>
                        {props.stats ? props.stats.map((el, i) => {
                            return (
                                <StatsListItem key={`${el}-${i}`}>
                                    <Gauge height={`${el.statValue}px`}>{`${el.statValue}`}</Gauge>
                                    <Statsname >{el.name}</Statsname>
                                </StatsListItem>
                            );
                        }) : null}

                    </StatsList>
                </StyledStatsContainer>
                <CloseButtonDiv >
                    <AiOutlineCloseCircle cursor={"pointer"} onClick={props.setPopupCard} />
                </CloseButtonDiv>
            </RightSide>
        </StyledContainer>
    );
}
