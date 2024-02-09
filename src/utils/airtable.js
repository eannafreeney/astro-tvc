import {
  getArtistCollection,
  getAvailableBooks,
  getCollection,
  getAirtableSlides,
  getTagCollection,
  getAllBooks,
} from "../api/api";

export const sortByLatestRelease = (a, b) => {
  return new Date(b.releaseDate) - new Date(a.releaseDate);
};

export const sortBySKU = (a, b) => {
  const skuA = parseInt(a.SKU.slice(3), 10);
  const skuB = parseInt(b.SKU.slice(3), 10);
  return skuB - skuA;
};

export const getAllBooksByRelease = async () => {
  const books = await getAllBooks();
  return books.sort(sortBySKU);
};

export const getAllAvailableBooksByRelease = async () => {
  const books = await getAvailableBooks();
  return books.sort(sortByLatestRelease);
};

export const getCollectionByRelease = async (handle, limit) => {
  const data = await getCollection(handle, limit);
  return data.sort(sortByLatestRelease);
};

export const getTagCollectionByRelease = async (handle) => {
  const data = await getTagCollection(handle);
  return data.sort(sortByLatestRelease);
};

export const getArtistCollectionByRelease = async (handle) => {
  const data = await getArtistCollection(handle);
  return data.sort(sortByLatestRelease);
};

export const getSlides = async () => await getAirtableSlides();
