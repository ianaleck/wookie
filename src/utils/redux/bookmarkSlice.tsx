import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("bookmark") || "[]"),
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setBookMark: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new

      state.value = action.payload;
      localStorage.setItem("bookmark", JSON.stringify(action.payload));

      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBookMark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
