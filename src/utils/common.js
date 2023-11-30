export const getHomepageCollections = (data) => [
  {
    title: "Recent",
    data: data[0],
    link: "/collections/recent",
  },
  {
    title: "City Diaries",
    data: data[1],
    link: "/collections/city-diaries",
  },
  {
    title: "Featured",
    data: data[2],
    link: "/collections/featured",
  },
];

export const slugify = (string) => {
  return (
    string
      // remove leading & trailing whitespace
      .trim()
      // remove special characters
      // .replace(/[^A-Za-z0-9 ]/g, "")
      // replace spaces
      .replace(/\s+/g, "-")
      // remove leading & trailing separtors
      .replace(/^-+|-+$/g, "")
      // output lowercase
      .toLowerCase()
  );
};

/**
 * Unslugifies a slugified string.
 *
 * @param {string} slug slugified string.
 * @returns {string} un-slugified string.
 */
export const unslugify = (slug) =>
  slug
    .replace(/\-/g, " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );

export const calcPercentageSold = (edition, inventory) =>
  Math.round(((edition - inventory) / edition) * 100);

export const getPrice = (product) =>
  product.comparePrice ? product.comparePrice : product.price;
