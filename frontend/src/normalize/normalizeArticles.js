import { normalize, schema } from "normalizr";

export default function normalizeArticles(articlesList) {
  const tagsSchema = new schema.Entity("tags");
  const articleSchema = new schema.Entity("articles", {
    tags: [tagsSchema],
  });

  return normalize(articlesList, [articleSchema]);
}
