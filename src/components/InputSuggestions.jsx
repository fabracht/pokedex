import React from "react";
import styled from "@emotion/styled";

export const InputSuggestionList = styled.ul`
    display: flex;
    flex-direction: column;
    // gap: 30px;
    list-style: none;
    position: absolute;
    top: 90px;
    left: 16%;
    background-color: white;
    padding-right: 50px;
    z-index: 100;
    @media(max-width: 500px) {
        left: 7%;
    }
    `;
export const InputSuggestionItem = styled.li`
    font-size: 3rem;
    padding-bottom: 15px;
    color: rgba(0, 60, 255, 0.4);
    &:not(:last-child) {
        border-bottom: 1px dashed lightgrey;
    }
    @media(max-width: 500px) {
            font-size: 1rem;
    }
    `;

export const ActiveSuggestionItem = styled.li`
    font-size: 3rem;
    padding-bottom: 15px;
    color: rgba(0, 60, 255, 0.4);
    background-color: red;
    cursor: pointer;
    &:not(:last-child) {
        border-bottom: 1px dashed lightgrey;
    }
    @media(max-width: 500px) {
        font-size: 1rem;        
    }
    `;
export function InputSuggestions(props) {

    const handleMouseEnter = (id) => {
        props.setSelected(id);
    };
    const handleMouseLeave = (ev) => {
        props.setSelected(null);
    };
    const handleMouseDown = (ev) => {
        ev.preventDefault();
        props.setSearch(props.possibilities[props.selected]);
        props.setPossibilities(null);
        props.setSelected(null);
        props.inputRef.current.focus();
    };

    return (
        <InputSuggestionList onMouseOut={handleMouseLeave} >
            {props.possibilities ? props.possibilities.map((el, i) => {
                if (props.selected === i) {
                    return <ActiveSuggestionItem onClick={handleMouseDown} key={el}>{el}</ActiveSuggestionItem>;
                }
                return <InputSuggestionItem onMouseEnter={handleMouseEnter.bind(this, i)} key={el}>{el}</InputSuggestionItem>;
            }) : null}
        </InputSuggestionList>
    );
}
