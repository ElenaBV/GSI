import { AnyAction } from "@reduxjs/toolkit";

const initialState = {
    score: 0
  };

export const scoreReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case "score":
            return { ...state, score: payload};
        default:
            return state;
    }
};