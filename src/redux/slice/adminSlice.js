import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    adminData: [],
}

export const adminSlice = createSlice({
    name: 'adminData',
    initialState,
    reducers: {

        storeAdminData: (state, action) => {
            state.adminData = [...state.adminData, action.payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { storeAdminData } = adminSlice.actions

export default adminSlice.reducer