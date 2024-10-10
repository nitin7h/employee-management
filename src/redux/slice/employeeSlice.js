import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employeeData: [],
}

export const employeeSlice = createSlice({
    name: 'adminData',
    initialState,
    reducers: {

        storeEmployeeData: (state, action) => {
            state.employeeData = [...state.employeeData, action.payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { storeEmployeeData } = employeeSlice.actions

export default employeeSlice.reducer