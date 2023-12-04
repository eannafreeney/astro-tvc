import fs from "fs";
import Airtable from "airtable";

const airtableBaseId = "appJK9YS14GbeGi1K";
const apiKey = "keyLDxOIdcrX4g6KY";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: apiKey,
});

// get a list of all artists, tags and titles so that pages can be prerendered per route

const base = Airtable.base(airtableBaseId);

const data = {
  tags: [],
  titles: [],
  artists: [],
  collections: [],
  funding: {},
  books: {},
};

const uniqueTags = new Set();
const uniqueArtists = new Set();
const uniqueCollections = new Set();

base("Catalogue")
  .select()
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach((record) => {
        if (record.fields.status === "Available") {
          data.titles.push(slugify(record.fields.title));

          // Ensure unique tags
          record.fields.tags.forEach((tag) => uniqueTags.add(slugify(tag)));

          // Ensure unique artists
          record.fields.artist.forEach((art) =>
            uniqueArtists.add(slugify(art))
          );

          // Get books that are being funded
          record.fields.categories.forEach((cat) => {
            if (cat === "Funding") {
              // uniqueFunding.add(slugify(record.fields.title));
              data.funding = { [slugify(record.fields.title)]: true };
            }
          });

          // Ensure unique collections
          record.fields.categories.forEach((cat) =>
            uniqueCollections.add(slugify(cat))
          );

          // create book obj with sku and id
          data.books[slugify(record.fields.title)] = {
            ID: record.fields.shopifyID,
            SKU: record.fields.SKU,
          };
        }
      }, {});

      // Convert Set to array and assign to data.tags and data.artists
      data.tags = [...uniqueTags];
      data.artists = [...uniqueArtists];
      data.collections = [...uniqueCollections];

      fs.writeFileSync("scripts/info.json", JSON.stringify(data, null, 2));

      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

const slugify = (category) => {
  return (
    category
      // remove leading & trailing whitespace
      .trim()
      // remove special characters
      .replace(/[^A-Za-z0-9- ]/g, "")
      // replace spaces
      .replace(/\s+/g, "-")
      // remove leading & trailing separtors
      .replace(/^-+|-+$/g, "")
      // output lowercase
      .toLowerCase()
  );
};
