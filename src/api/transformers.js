import _ from "lodash";

import { slugify } from "../utils/utils";

export const OVERVIEW_FIELDS = [
  "title",
  "artist",
  "Release Date",
  "SKU",
  "categories",
  "cover",
];

export const getOverview = (book) => ({
  title: book.title,
  artist: book.artist,
  releaseDate: book["Release Date"],
  categories: book.categories?.map((cat) => slugify(cat)),
  cover: book.cover?.map((cover) =>
    _.pick(cover, ["id", "width", "height", "url"])
  ),
});
