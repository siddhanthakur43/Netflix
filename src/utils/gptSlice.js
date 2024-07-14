import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false
    },
    reducers: {
        toggleisGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
    },
});

export const { toggleisGptSearchView } = gptSlice.actions;

export default gptSlice.reducer;