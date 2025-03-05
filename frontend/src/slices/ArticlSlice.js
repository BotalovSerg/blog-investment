import { createSlice } from "@reduxjs/toolkit";
import normalizeArticles from "../normalize/normalizeArticles";

const initialState = {
  articlesList: [],
  articles: {},
};

export const articlesSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      const { result, entities } = normalizeArticles(action.payload);

      state.articlesList = result;
      state.articles = entities.articles;
    },
    addArticle: (state, action) => {
      const newArticle = action.payload;
      state.articles[newArticle.id] = newArticle;
    },
  },
});

export const { setArticles, addArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
