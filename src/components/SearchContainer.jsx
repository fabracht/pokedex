import React, { useContext, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "@emotion/styled";
import { AppStateContext } from "../AppState";
import { InputSuggestions } from "./InputSuggestions";

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
`;
export const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    padding: 10px;
`;



export const StyledSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
`;


export default function SearchContainer(props) {
    const inputRef = useRef(null);
    const state = useContext(AppStateContext);
    const [possibilities, setPossibilities] = useState(null);
    const [selectedPossibility, setSelectedPossibility] = useState(null);

    const handleChange = (ev) => {
        const value = ev.currentTarget.value.toLowerCase();
        props.setSearchText(value);

        const pokemonMainList = JSON.parse(state.pokemonMainList);
        if (pokemonMainList) {
            const possibleValues = pokemonMainList.filter(el => el.match(new RegExp(value, "g")));
            setPossibilities(possibleValues.slice(0, 3));
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

    return (
        <StyledSearchContainer>
            <StyledForm autoComplete="off" onSubmit={props.handleSubmit}>
                <StyledInput ref={inputRef} onKeyDown={handleKeyPress} autoFocus={true} placeholder="Search by name or number" type="text" onChange={handleChange} value={props.searchText} />
                <StyledButton type="submit"><FiSearch /></StyledButton>
            </StyledForm>
            <InputSuggestions inputRef={inputRef} setSearch={props.setSearchText} possibilities={possibilities} setPossibilities={setPossibilities} setSelected={setSelectedPossibility} selected={selectedPossibility}></InputSuggestions>
        </StyledSearchContainer>
    );
}