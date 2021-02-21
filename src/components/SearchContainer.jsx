import React, { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "@emotion/styled";
import { AppStateContext } from "../AppState";

export const StyledButton = styled.button`
    font-size: 3rem;
    display: flex;
    background-color: transparent;
    border: none;
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
`;

export default function SearchContainer(props) {
    const state = useContext(AppStateContext);

    return (
        <StyledSearchContainer>
            <StyledForm onSubmit={props.handleSubmit}>
                <StyledInput type="text" onChange={ev => props.setSearchText(ev.currentTarget.value.toLowerCase())} value={props.searchText} />
                <StyledButton type="submit"><FiSearch /></StyledButton>
            </StyledForm>
        </StyledSearchContainer>
    );
}

// const dispatch = useStateDispatch();
// const state = dispatch({
//     type: "DEFAULT",
//     payload: {},
// });
// console.log(state);