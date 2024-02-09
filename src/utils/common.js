import unaccent from "unaccent";

export const slugify = (string) => {
  const unaccentedStr = unaccent(string.toLowerCase());
  return (
    unaccentedStr
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

export async function status(status, url) {
  const res = await fetch(url);
  return new Response(res.body, {
    headers: res.headers,
    status,
  });
}
