import {
  getArtistCollection,
  getAvailableBooks,
  getCollection,
  getAirtableSlides,
} from "../api/api";

export const sortByLatestRelease = (a, b) => {
  return new Date(b.releaseDate) - new Date(a.releaseDate);
};

export const getAllBooksByRelease = async () => {
  const books = await getAvailableBooks();
  return books.sort(sortByLatestRelease);
};

export const getCollectionByRelease = async (handle, limit) => {
  const data = await getCollection(handle, limit);
  return data.sort(sortByLatestRelease);
};

export const getArtistCollectionByRelease = async (handle) => {
  const data = await getArtistCollection(handle);
  return data.sort(sortByLatestRelease);
};

export const getSlides = async () => await getAirtableSlides();
