import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIntitialSceneState, InitialSceneProps } from "../three-helpers";

export const threeStoreSlice = createSlice({
  name: "three",
  initialState: {
    running: false,
    scene: getIntitialSceneState(),
  },
  reducers: {
    updateScene: (state, action: PayloadAction<InitialSceneProps>) => {},
  },
});

export const {} = threeStoreSlice.actions;
export default threeStoreSlice.reducer;
