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
];

export const slugify = (string) => {
  return (
    string
      // remove leading & trailing whitespace
      .trim()
      // remove special characters
      .replace(/[^A-Za-z0-9 ]/g, "")
      // replace spaces
      .replace(/\s+/g, "-")
      // remove leading & trailing separtors
      .replace(/^-+|-+$/g, "")
      // output lowercase
      .toLowerCase()
  );
};
