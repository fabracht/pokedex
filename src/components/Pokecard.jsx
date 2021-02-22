import styled from "@emotion/styled";
import React, { useEffect, useState } from 'react';
import { ColorMatcher } from "../utils/ColorMatcher";
import loadingLogo from "../assets/loadingLogo.svg";
import { fillZeroes } from "../utils/fillZeroes";

import PokemonInfoPopup from "./PokemonInfoPopup";

import { RiForbid2Line } from "react-icons/ri";
export const color = "black";

const StyledPokecard = styled.li`
  padding: clamp(20px, 5%, 50px);
  background-color: rgba(250, 250, 250, 0.9);
  font-size: 24px;
  border-radius: 4px;
  color: ${color};
  font-weight: bold;
  display: flex;
  width: clamp(140px, 100%, 180px);
  flex-direction: column;
  row-gap: 10px;
  transition: all 0.1s;
  border: inset 3px black;
  &:hover {
    transform: translate(-10px, 10px);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 50%);
    background-color: rgba(250, 250, 250, 1.0);
    border: 1px solid black;
  };
  &:active {
    background-color: grey;
  }
`;

const TypesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`;

const TypeElement = styled.div`
  width: 30%;
  padding: 3px 15px;
  background-color: ${props => props.pokeType ? ColorMatcher(props.pokeType) : "grey"};
  text-transform: capitalize;
  border-radius: 2px;
`;

const StyledNumber = styled.span`
font-size: 20px;
color: rgba(100, 100, 100, 0.7);`;
const StyledName = styled.span`
text-transform: capitalize`;

const StyledImageDiv = styled.div`
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 5px;
  display: flex;
  justify-content: center;
`;

export default function Pokecard(props) {
  const { name, url } = props;
  const [image, setImage] = useState();
  const [pokeId, setPokeId] = useState(null);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [abilities, setAbilities] = useState([]);
  const [notFound, setNotFound] = useState(false);


  const fetchData = (pokemonUrl) => {
    setLoading(true);
    fetch(pokemonUrl).then(result => result.json()).then(json => {
      // (hp/atk/def/special-atk/special-def/speed)
      setStats(json.stats.map(el => { return { statValue: el.base_stat, name: el.stat.name }; }));
      setAbilities(json.abilities.map(el => {
        return { name: el.ability.name, url: el.ability.url };
      }));
      setLoading(false);
      setPokeTypes(json.types.map(el => el.type.name));
      setPokeId(json.id);
      setImage(json.sprites.other["official-artwork"].front_default);
    }).catch(er => console.log(er));
  };

  const popupCard = () => {
    setShowStats(!showStats);
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
    } else {
      setNotFound(true);
    }
    return () => {
    };
  }, [url]);


  return (
    <>
      <StyledPokecard key={url} onClick={popupCard}>
        <StyledImageDiv>
          {notFound ? <RiForbid2Line style={{ width: 160, height: 160 }} /> : <img src={loading ? loadingLogo : `${image}`} alt={`${name}`} width="160px" />}
        </StyledImageDiv>
        <StyledNumber>{`${fillZeroes(pokeId)}`}</StyledNumber>
        <StyledName>{name}</StyledName>
        <TypesContainer>
          {pokeTypes.map((el, i) => <TypeElement key={i} pokeType={el}>{el}</TypeElement>)}
        </TypesContainer>
      </StyledPokecard>
      {showStats ? <PokemonInfoPopup abilities={abilities} image={image} name={name} pokeId={pokeId} setPopupCard={popupCard} stats={stats} /> : null}
    </>
  );
};
