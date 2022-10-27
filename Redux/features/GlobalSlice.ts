import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweetAdded: 0,
    commentAdded: 0,
  dataChanged : 0,
  tweetBoxModalState: false,
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        tweetAdded: (state) => {
            state.tweetAdded+=1;
        },
        commentAdded: (state) => { 
            state.commentAdded+=1;
        },
        tweetBoxModal: (state) => {
            state.tweetBoxModalState =!state.tweetBoxModalState;
        },
        
        clicked: (state) => {
            state.dataChanged+=1
        }
    }
})

export const { tweetAdded , commentAdded , tweetBoxModal , clicked  } = globalSlice.actions;
export default globalSlice.reducer