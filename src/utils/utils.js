import _ from "lodash";
import { getAvailableBooks } from "../api/api";

export const sortByLatestRelease = (a, b) => {
  return new Date(b.releaseDate) - new Date(a.releaseDate);
};

export const getAllBooks = async () => {
  const books = await getAvailableBooks();
  // return books;
  return books.sort(sortByLatestRelease);
};

export const getCollection = (data, limit = 6) =>
  data
    .map((book) => getOverviewData(book))
    .slice(0, limit)
    .sort(sortByLatestRelease);


export const transformArrayToDictionary = (inputArray, keyField) => {
  return inputArray.reduce((acc, book) => {
    book[keyField].forEach((category) => {
      if (!acc[slugify(category)]) {
        acc[slugify(category)] = [];
      }
      acc[slugify(category)].push(book);
    });

    return acc;
  }, {});
};

export const formatPrice = (currency = "EUR", value = 0) =>
  Intl.NumberFormat("en-US", {
    currency,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
