import { configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "./bookmarkSlice";

export const store = configureStore({
  reducer: {
    bookmark: bookmarkSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
