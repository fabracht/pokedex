import React, { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "@emotion/styled";
import { AppStateContext } from "../AppState";

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

export const InputSuggestionList = styled.ul`
    display: flex;
    flex-direction: column;
    // gap: 30px;
    list-style: none;
    position: absolute;
    top: 90px;
    left: 10px;
    background-color: white;
    padding-right: 50px;
    `;
export const InputSuggestionItem = styled.li`
    font-size: 3rem;
    padding-bottom: 15px;
    color: rgba(0, 60, 255, 0.4);
    &:not(:last-child) {
        border-bottom: 1px dashed lightgrey;
    }
    `;

export const ActiveSuggestionItem = styled.li`
    font-size: 3rem;
    padding-bottom: 15px;
    color: rgba(0, 60, 255, 0.4);
    background-color: red;
    
    &:not(:last-child) {
        border-bottom: 1px dashed lightgrey;
    }
    `;

export const StyledSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
`;


function InputSuggestions(props) {
    return (
        <InputSuggestionList>
            {props.possibilities ? props.possibilities.map((el, i) => {
                if (props.selected === i) {
                    return <ActiveSuggestionItem key={el}>{el}</ActiveSuggestionItem>;
                }
                return <InputSuggestionItem key={el}>{el}</InputSuggestionItem>;
            }) : null}
        </InputSuggestionList>
    );
}


export default function SearchContainer(props) {
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
            } else if (selectedPossibility < possibilities.length - 1) {
                setSelectedPossibility(selectedPossibility + 1);
            }
        } else if (ev.code === "ArrowUp") {
            ev.preventDefault();
            if (selectedPossibility === null) {
                setSelectedPossibility(0);
            } else if (selectedPossibility > 0) {
                setSelectedPossibility(selectedPossibility - 1);
            } else if (selectedPossibility === 0) {
                setSelectedPossibility(null);
            }
        } else if (ev.code === "Enter") {
            ev.preventDefault();
            if (selectedPossibility) {
                if (possibilities) {
                    props.setSearchText(possibilities[selectedPossibility]);
                    setPossibilities(null);
                    setSelectedPossibility(null);
                }
            } else {
                props.handleSubmit(ev);
                setPossibilities(null);
            }

        } else if (ev.code === "Escape") {
            setPossibilities(null);
        }
    };

    return (
        <StyledSearchContainer>
            <StyledForm autoComplete="off" onSubmit={props.handleSubmit}>
                <StyledInput onKeyDown={handleKeyPress} autoFocus={true} placeholder="Search by name or number" type="text" onChange={handleChange} value={props.searchText} />
                <StyledButton type="submit"><FiSearch /></StyledButton>
            </StyledForm>
            <InputSuggestions possibilities={possibilities} selected={selectedPossibility}></InputSuggestions>
        </StyledSearchContainer>
    );
}