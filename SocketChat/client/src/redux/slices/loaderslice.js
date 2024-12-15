import { createSlice } from '@reduxjs/toolkit'

const LoaderSlice = createSlice({
      name: 'LOADER',
      initialState : true,
      reducers : {
        TURNON : (currentval,action) => {
            return true;
        },
        TURNOFF : (currentval,action) => {
            return false;
        }
      }
})

export const { TURNON,TURNOFF } = LoaderSlice.actions;
export default LoaderSlice.reducer;
