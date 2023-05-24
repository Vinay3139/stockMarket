import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    marketdata: []
}

const productSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        getData: (state, action) => {
            state.marketdata = action.payload
        },
}})

export const { getData,setSliderRateValue } = productSlice.actions
export default productSlice.reducer