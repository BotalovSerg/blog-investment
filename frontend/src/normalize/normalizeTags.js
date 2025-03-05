import { normalize, schema } from "normalizr";

export default function normalizeArticleCreate(article) {
  const articleTags = new schema.Entity("tags");
  const userSchema = new schema.Entity("author");
  const articleSchema = new schema.Entity("article", {
    author: userSchema,
    tags: [articleTags],
  });

  return normalize(article, articleSchema);
}
