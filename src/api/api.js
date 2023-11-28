import Airtable from "airtable";
import { slugify, sortByLatestRelease } from "../utils/utils";
import { OVERVIEW_FIELDS, getOverview } from "./transformers";

const airtableBaseId = import.meta.env.PRIVATE_CATEALOGUE_BASE_ID;
const apiKey = "keyLDxOIdcrX4g6KY";
const baseName = "Catalogue";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey,
});

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
          records?.forEach((record) => {
            try {
              if (record.get("status") === "Available") {
                availableBooks.push(getOverview(record.fields));
              }
            } catch (e) {
              console.log(e);
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

          resolve(availableBooks.sort(sortByLatestRelease));
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
          records?.forEach((record) => {
            try {
              if (record.get("SKU") === SKU) {
                book = record.fields;
              }
            } catch (e) {
              console.log(e);
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

export const getBookByHandle = async (handle) => {
  const base = Airtable.base(airtableBaseId);

  return new Promise((resolve, reject) => {
    let book;

    base(baseName)
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records?.forEach((record) => {
            try {
              if (slugify(record.get("title")) === handle) {
                book = record.fields;
              }
            } catch (e) {
              console.log(e);
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
          records?.forEach((record) => {
            try {
              if (
                record
                  .get("categories")
                  .map((cat) => slugify(cat))
                  .includes(handle)
              ) {
                books.push(getOverview(record.fields));
              }
            } catch (e) {
              console.log(e);
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
