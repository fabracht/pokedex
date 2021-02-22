import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { fillZeroes } from "../utils/fillZeroes";
import { RiForbid2Line } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { StatsContainer } from './StatsContainer';

const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 10%;
    left: 15%;
    width: clamp(300px, 70%, 900px);
    padding: 20px;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    z-index: 100;
    @media(max-width: 500px) {
        flex-direction: column;
        top: 0;
        left: 0;
        position: relative;
        padding: 5px;
        margin: 0;
    }
`;

const LeftSide = styled.div`
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media(max-width: 500px) {
        width: 100%;
    }
    `;
const RightSide = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @media(max-width: 500px) {
        width: 100%;
        padding: 0;
        margin: 0;
    }
`;

const StyledStatsTitle = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    text-align: center;
    width: 100%;
    font-size: 2rem;
    text-transform: capitalize;
    line-height: 30%;
    @media(max-width: 500px) {
        font-size: 2rem;
        display: flex;

    }
`;

const StyledDescriptionDiv = styled.div`
    max-width: 80%;
    font-size: 1rem;
    text-indent: 50px;
    text-align: justify;
    leter-spacing: 2px;
    @media(max-width: 500px) {
        text-indent: 10px;
    }
    `;

const CloseButtonDiv = styled.div`
    place-self: flex-end;
    text-align: right;
    font-size: 3rem;
    @media(max-width: 500px) {
        position: relative;
        top: 5%;
    }
`;

const StyledAbilitiesDiv = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const StyledAbility = styled.li`
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px 30px;
    text-transform: capitalize;
    @media(max-width: 500px) {

    }
`;
const StyledImageDiv = styled.div`
    width: 50vw;
    display: flex;
    justify-content: center;
    place-items: flex-end;
    `;

const StyledImage = styled.img`
    scale: 0.7;
`;
export default function PokemonInfoPage(props) {
    const [description, setDescription] = useState(undefined);

    const fetchData = () => {
        fetch(`https://pokeapi.co/api/v2/ability/${props.pokeId}`).then(result => result.json()).then(json => {
            setDescription(json.effect_entries.pop().effect);
        }).catch(er => {
            console.log(er);
        });
    };

    useEffect(() => {
        if (!description) {
            fetchData();
        }
        return () => {
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);

    return (
        <StyledContainer>
            <StyledStatsTitle>
                <span>{props.name} </span><span>{`${fillZeroes(props.pokeId)}`}</span>
            </StyledStatsTitle>
            <LeftSide>
                <StyledImageDiv>
                    {props.image ? <StyledImage src={`${props.image}`} alt={`${props.name}`} /> : <RiForbid2Line fontSize="8rem" />}
                </StyledImageDiv>
                <StyledAbilitiesDiv>
                    {props.abilities ? props.abilities.map((el, i) => <StyledAbility key={`${el.name}-${i}`}>{el.name}</StyledAbility>) : null}
                </StyledAbilitiesDiv>
            </LeftSide>
            <RightSide>
                <StyledDescriptionDiv>
                    <p>{description ? description : "This Pokemon is very special. Make sure you keep reading."}</p>
                </StyledDescriptionDiv>
                <StatsContainer stats={props.stats}></StatsContainer>
                <CloseButtonDiv >
                    <AiOutlineCloseCircle cursor={"pointer"} onClick={props.setPopupCard} />
                </CloseButtonDiv>
            </RightSide>
        </StyledContainer>
    );
}
