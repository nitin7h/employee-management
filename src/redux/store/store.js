import { configureStore } from '@reduxjs/toolkit'

import adminSlice from '../slice/adminSlice'
import employeeSlice from '../slice/employeeSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            employee: employeeSlice,
            admin: adminSlice
        },
    })
}