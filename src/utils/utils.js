import _ from "lodash";
import { getAvailableBooks, getCollection } from "../api/api";

export const sortByLatestRelease = (a, b) => {
  return new Date(b.releaseDate) - new Date(a.releaseDate);
};

export const getAllBooksByRelease = async () => {
  const books = await getAvailableBooks();
  return books.sort(sortByLatestRelease);
};

export const getCollectionByRelease = async (handle, limit = 10) => {
const books = await getCollection(handle, limit);
return books.sort(sortByLatestRelease);
}

export const formatPrice = (currency = "EUR", value = 0) =>
  Intl.NumberFormat("en-US", {
    currency,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
