import { AnyAction } from "@reduxjs/toolkit";

interface IUserInitialState {
    user: {
        login: string,
        // password?: number,
        email: string,
    };
    }

const initialState: IUserInitialState = {
    user: {
        login: '',
        email: '',
    },
    
};

export const userReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case "Login":
            return { ...state, user: payload};
        default:
            return state;
    }
};