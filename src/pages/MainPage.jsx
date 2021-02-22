import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import backgroundSVG from "../assets/Pattern-Randomized.svg";
import PokecardContainer from '../components/PokecardContainer';
import Pokecard from '../components/Pokecard';
import Header from '../components/Header';
import { ButtonContainer } from '../components/ButtonContainer';
import { Button } from '../components/Button';
import SearchContainer from "../components/SearchContainer";
import Logo from "../assets/ball-icon.svg";
import { colorWheel } from "../utils/colorWheel";

const AppContainer = styled.div`
  background-image: url(${backgroundSVG});
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const StyledTitle = styled.div`
    font-size: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: ${colorWheel.primarydark};
    text-shadow: 5px 5px ${colorWheel.darkgrey};
    @media(max-width: 500px) {
        font-size: 3rem;
    }
`;
export default function MainPage() {
    const [pokemonMainList, setPokemonMainList] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [previousPageUrl, setPreviousPageUrl] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

    const nextPage = (ev) => {
        ev.preventDefault();
        setPage(page + 1);
        fetchData(nextPageUrl);
    };
    const previousPage = (ev) => {
        ev.preventDefault();
        setPage(page - 1);
        fetchData(previousPageUrl);
    };

    const fetchData = (address) => {
        if (address) {
            fetch(address).then(result => result.json()).then(json => {
                const { results, next, previous } = json;
                const { name, id, sprites, types } = json;
                if (results) {
                    setPokemonMainList(results);
                    setNextPageUrl(next);
                    setPreviousPageUrl(previous);
                } else if (name) {
                    setPokemonMainList([{ name: name, id: id, sprites: sprites, types: types, url: address }]);
                    setNextPageUrl(null);
                    setPreviousPageUrl(null);
                }
                setSearchText("");
            }).catch(er => {
                console.log(er);
                setPokemonMainList([{ name: "Sorry but we couldn't find your Pokemon", id: "X", sprites: null, types: ["few"], url: null }]);
                setNextPageUrl(null);
                setPreviousPageUrl(null);
                setSearchText("");
            });
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetchData(`https://pokeapi.co/api/v2/pokemon/${searchText}`);
    };

    useEffect(() => {
        if (!pokemonMainList) {
            fetchData("https://pokeapi.co/api/v2/pokemon/?limit=8");
        }
        return () => {
        };
    }, [pokemonMainList]);


    return (
        <AppContainer>
            <Header>
                <StyledTitle><img src={Logo} style={{ maxHeight: 100 }} alt="pokeball" /><span>Pokédex</span></StyledTitle>
                <SearchContainer searchText={searchText} setPokemonMainList={setPokemonMainList} setSearchText={setSearchText} handleSubmit={handleSubmit}></SearchContainer>
            </Header>
            <PokecardContainer>
                {pokemonMainList ? pokemonMainList.map((el, i) => {
                    return <Pokecard key={el.url} {...el} />;
                }) : null}
            </PokecardContainer>
            <ButtonContainer>
                {previousPageUrl ? <Button onClick={previousPage}>Previous</Button> : null}
                {nextPageUrl ? <Button onClick={nextPage}>Next</Button> : null}
            </ButtonContainer>
        </AppContainer>);


}

