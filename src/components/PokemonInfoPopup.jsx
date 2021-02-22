import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { fillZeroes } from "../utils/fillZeroes";
import { RiForbid2Line } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";

const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 10%;
    left: 15%;
    width: 70%;
    padding: 20px;
    min-height: 60vh;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const StyledStatsTitle = styled.div`
    text-align: center;
    width: 100%;
    font-size: 2rem;
    text-transform: capitalize;
    line-height: 30%;
`;

const StyledDescriptionDiv = styled.div`
    max-width: 80%;
    font-size: 1rem;
    text-indent: 50px;
    text-align: justify;
    leter-spacing: 2px;
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
    place-self: flex-end;
    text-align: right;
    font-size: 3rem;
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
`;

// (hp/atk/def/special-atk/special-def/speed)
export default function PokemonInfoPage(props) {
    const [description, setDescription] = useState(undefined);
    // const [openDescription, setOpenDescription] = useState(false);

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
    }, []);

    return (
        <StyledContainer>
            <StyledStatsTitle>
                <h2>{props.name} {`${fillZeroes(props.pokeId)}`}</h2>
            </StyledStatsTitle>
            <LeftSide>
                {props.image ? <img src={`${props.image}`} alt={`${props.name}`} width="70%" /> : <RiForbid2Line fontSize="8rem" />}
                <StyledAbilitiesDiv>
                    {props.abilities ? props.abilities.map((el, i) => <StyledAbility key={`${el.name}-${i}`}>{el.name}</StyledAbility>) : null}
                </StyledAbilitiesDiv>
            </LeftSide>
            <RightSide>
                <StyledDescriptionDiv>
                    <p>{description ? description : "This Pokemon is very special. Make sure you keep reading."}</p>
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
