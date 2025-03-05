import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slices/ArticlSlice.js";
import authUserReducer from "./slices/authUser.js";
import tagsReducer from "./slices/TagsSlice.js";

export const store = configureStore({
  reducer: {
    articlesLoad: articleReducer,
    isAuthUser: authUserReducer,
    tagsLoad: tagsReducer,
  },
});
