import { createSlice } from '@reduxjs/toolkit';

const gernalSlice = createSlice(
    {
        name: 'gernal',
        initialState: {
            loader: false,
            specialityObject:""
        },
        reducers: {
            setLoader: (state, action) => {
                state.loader = action.payload;
            },
            setSpecialityObject:(state,action)=>{
                state.specialityObject = action.payload
            }
        },
    }
);

export const { setLoader,setSpecialityObject } = gernalSlice.actions;
export const gernalReducer = gernalSlice.reducer;
