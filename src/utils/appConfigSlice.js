import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState: {
        preferredLanguage: 'en'
    },
    reducers: {
        changePreferredLanguage: (state, action) => {
            state.preferredLanguage = action.payload;
        },
    },
});

export const { changePreferredLanguage } = appConfigSlice.actions;

export default appConfigSlice.reducer;
