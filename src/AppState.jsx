import React, { createContext, useReducer, useEffect, useContext } from "react";

const defaultContext = {
    pokemonMainList: [],
};

export const AppStateContext = createContext(defaultContext);

export const AppDispatchContext = createContext(undefined);

const reducer = (state, action) => {
    console.log(action.type);
    switch (action.type) {
        case "INITIALIZE":
            fetch("https://pokeapi.co/api/v2/pokemon/?limit=3000").then(result => result.json()).then(json => {
                const { results } = json;
                state.pokemonMainList = results.map(el => el.name);
                window.sessionStorage.setItem("pokemonmainlist", JSON.stringify(state.pokemonMainList));
            }).catch(er => {
                console.log(er);
            });
            break;
        default:
            return state;
    }
};

export const useStateDispatch = () => {
    const dispatch = useContext(AppDispatchContext);
    if (!dispatch) {
        throw new Error("useStateDispatch was called outside of the AppDispatchContext provider");
    }
    return dispatch;
};

const AppStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultContext);

    useEffect(() => {
        const pokemonList = window.sessionStorage.getItem("pokemonmainlist");
        if (!pokemonList) {
            dispatch({
                type: "INITIALIZE",
            });
        } else {
            state.pokemonMainList = pokemonList;
        }
    }, [state]);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

export default AppStateProvider;