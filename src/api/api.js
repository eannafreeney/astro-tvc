import Airtable from "airtable";
import { sortByLatestRelease } from "../utils/utils";
import { slugify } from "../utils/common";
import { OVERVIEW_FIELDS, getOverview } from "./transformers";

const airtableBaseId = import.meta.env.PRIVATE_CATEALOGUE_BASE_ID;
const apiKey = "keyLDxOIdcrX4g6KY";
const baseName = "Catalogue";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey,
});

const isRecordAvailable = (record) => record.get("status") === "Available";

/**
 * Fetch books from airtable
 * @returns
 */
export const getAvailableBooks = async () => {
  const base = Airtable.base(airtableBaseId);

  return new Promise((resolve, reject) => {
    const availableBooks = [];

    base(baseName)
      .select({
        fields: OVERVIEW_FIELDS.concat(["status"]),
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records?.filter(isRecordAvailable).forEach((record) => {
            availableBooks.push(getOverview(record.fields));
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(availableBooks);
        }
      );
  });
};

export const getBookBySKU = async (SKU) => {
  const base = Airtable.base(airtableBaseId);

  return new Promise((resolve, reject) => {
    let book;

    base(baseName)
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records?.filter(isRecordAvailable).forEach((record) => {
            if (record.get("SKU") === SKU) {
              book = record.fields;
            }
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(book);
        }
      );
  });
};

export const getCollection = async (handle, limit) => {
  const base = Airtable.base(airtableBaseId);

  return new Promise((resolve, reject) => {
    let books = [];

    base(baseName)
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records?.filter(isRecordAvailable).forEach((record) => {
            if (
              record
                .get("categories")
                .map((cat) => slugify(cat))
                .includes(handle)
            ) {
              books.push(getOverview(record.fields));
            }
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          const sortedBooks = books.sort(sortByLatestRelease);
          const finalBooks = limit ? sortedBooks.slice(0, limit) : sortedBooks;

          resolve(finalBooks);
        }
      );
  });
};

export const getCollectionByArtist = async (handle, limit) => {
  const base = Airtable.base(airtableBaseId);

  return new Promise((resolve, reject) => {
    let books = [];

    base(baseName)
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records?.filter(isRecordAvailable).forEach((record) => {
            if (
              record
                .get("artist")
                .map((artist) => slugify(artist))
                .includes(handle)
            ) {
              books.push(getOverview(record.fields));
            }
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(books);
        }
      );
  });
};
