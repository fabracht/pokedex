import React, { useContext, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "@emotion/styled";
import { AppStateContext } from "../AppState";
import { InputSuggestions } from "./InputSuggestions";
import { colorWheel } from "../utils/colorWheel";

export const StyledButton = styled.button`
    font-size: 3rem;
    display: flex;
    padding: 30px 60px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
        background-color: ${colorWheel.secondary};
    }
    @media(max-width: 500px) {
        font-size: 1rem;
        padding: 20px 30px;
        border-radius: 0 10px 10px 0;
        background-color: ${colorWheel.primarydark}
    }
`;

export const StyledInput = styled.input`
    border: none;
    font-size: 3rem;
    padding: 20px 50px;
    display: flex;
    &:selected {
        border: none;
    }
    @media(max-width: 500px) {
        font-size: 1rem;
    }
`;
export const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colorWheel.darkgrey};
    padding: 10px;
    @media(max-width: 500px) {

    }
`;



export const StyledSearchContainer = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
    position: relative;
    @media(max-width: 500px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const StyledRandomizeButton = styled.div`
    font-size: 2rem;
    border: inset 2px black;
    border-radius: 10px;
    padding: 30px 10px;
    background-color: ${colorWheel.pink};
    cursor: pointer;

    &:hover {
        background-color: ${colorWheel.secondary};
    }
    @media(max-width: 500px) {
        font-size: 1rem;
        padding: 10px 0;
        width: 90%;
    }
`;

export default function SearchContainer(props) {
    const inputRef = useRef(null);
    const state = useContext(AppStateContext);
    const [possibilities, setPossibilities] = useState(null);
    const [selectedPossibility, setSelectedPossibility] = useState(null);

    const handleChange = (ev) => {
        const value = ev.currentTarget.value.toLowerCase();
        props.setSearchText(value);
        if (state) {
            const pokemonMainList = state.pokemonMainList;

            if (pokemonMainList) {
                const possibleValues = pokemonMainList.map(el => el.name).filter(el => el.match(new RegExp(value, "g")));
                setPossibilities(possibleValues.slice(0, 3));
            }
        }
        if (value.length === 0) {
            setPossibilities(null);
        }

    };

    const handleKeyPress = (ev) => {
        if (ev.code === "ArrowDown") {
            ev.preventDefault();
            if (selectedPossibility === null) {
                setSelectedPossibility(0);
            } else if (possibilities && selectedPossibility < possibilities.length - 1) {
                setSelectedPossibility(selectedPossibility + 1);
            }
        } else if (ev.code === "ArrowUp") {
            ev.preventDefault();
            if (selectedPossibility !== null) {
                if (possibilities && selectedPossibility > 0) {
                    setSelectedPossibility(selectedPossibility - 1);
                }
            }
            // else if (selectedPossibility === 0) {
            //     setSelectedPossibility(null);
            // }
        } else if (ev.code === "Enter") {
            ev.preventDefault();
            if (selectedPossibility !== null) {
                if (possibilities) {
                    props.setSearchText(possibilities[selectedPossibility]);
                    setPossibilities(null);
                    setSelectedPossibility(null);
                }
            } else {
                props.handleSubmit(ev);
                setPossibilities(null);
                setSelectedPossibility(null);
            }

        } else if (ev.code === "Escape") {
            setPossibilities(null);
        }
    };

    const handleRandomize = (ev) => {
        const randomResults = [];
        const pokemonRandomList = [];
        let random = Math.floor(Math.random() * state.pokemonMainList.length);
        if (state) {
            const { pokemonMainList } = state;
            randomResults.push(random);
            pokemonRandomList.push(pokemonMainList[random]);
            for (let i = 0; i < 19; ++i) {
                while (randomResults.includes(random)) {
                    random = Math.floor(Math.random() * state.pokemonMainList.length);
                }
                randomResults.push(random);
                pokemonRandomList.push(pokemonMainList[random]);
            }
            props.setPokemonMainList(pokemonRandomList);
        }

    };

    return (
        <StyledSearchContainer>
            <StyledRandomizeButton onClick={handleRandomize}>Random</StyledRandomizeButton>
            <StyledForm autoComplete="off" onSubmit={props.handleSubmit}>
                <StyledInput ref={inputRef} onKeyDown={handleKeyPress} autoFocus={true} placeholder="Search by name or number" type="text" onChange={handleChange} value={props.searchText} />
                <StyledButton type="submit"><FiSearch /></StyledButton>
            </StyledForm>
            <InputSuggestions inputRef={inputRef} setSearch={props.setSearchText} possibilities={possibilities} setPossibilities={setPossibilities} setSelected={setSelectedPossibility} selected={selectedPossibility}></InputSuggestions>
        </StyledSearchContainer>
    );
}