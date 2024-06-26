import Airtable from "airtable";
import { slugify } from "../utils/common";
import { OVERVIEW_FIELDS, getOverview, getBasic } from "./transformers";

const airtableBaseId = import.meta.env.PRIVATE_AIRTABLE_BASE_ID;
const apiKey = import.meta.env.PRIVATE_AIRTABLE_API;
const baseName = "Catalogue";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey,
});

const isRecordAvailable = (record) => record.get("status") === "Available";
const hasCopiesForSale = (record) =>
  !record.get("categories").includes("Sold Out");

export const getAllBooks = async () => {
  const base = Airtable.base(airtableBaseId);

  return new Promise((resolve, reject) => {
    const allBooks = [];

    base(baseName)
      .select({
        fields: OVERVIEW_FIELDS.concat(["ISBN"]),
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allBooks.push(getBasic(record.fields));
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(allBooks);
        }
      );
  });
};

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
          records
            ?.filter(isRecordAvailable)
            .filter(hasCopiesForSale)
            .forEach((record) => {
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

    console.log("SKU", SKU);

    base(baseName)
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records?.filter(isRecordAvailable).forEach((record) => {
            if (record.get("SKU") === SKU) {
              console.log("SKU: ", SKU, record.fields);
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

  console.log("base", base);

  return new Promise((resolve, reject) => {
    let books = [];

    base(baseName)
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records
            ?.filter(isRecordAvailable)
            .filter(hasCopiesForSale)
            .forEach((record) => {
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

          const finalBooks = limit ? books.slice(0, limit) : books;

          resolve(finalBooks);
        }
      );
  });
};

export const getTagCollection = async (handle, limit) => {
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
                .get("tags")
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

          resolve(books);
        }
      );
  });
};

export const getArtistCollection = async (handle) => {
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

export const getAirtableSlides = async () => {
  const base = Airtable.base(airtableBaseId);

  return new Promise((resolve, reject) => {
    let slides = [];

    base("Slides")
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records?.forEach((record) => {
            slides.push(record.fields);
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(slides);
        }
      );
  });
};
