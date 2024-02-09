import _ from "lodash";

import { slugify } from "../utils/common";

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

export const getBasic = (book) => ({
  title: book.title,
  artist: book.artist,
  ISBN: book.ISBN,
  SKU: book.SKU,
});
