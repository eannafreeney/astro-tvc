import fs from "fs";

const getProducts = async (options) => {
  const { limit = 200, buyerIP } = options;

  const data = await makeShopifyRequest(
    ProductsQuery,
    { first: limit },
    buyerIP
  );
  const { products } = data;

  if (!products) {
    throw new Error("No products found");
  }

  fs.writeFileSync("scripts/ids.json", JSON.stringify(data, null, 2));

  const productsList = products.edges.map((edge: any) => edge.node);
  const ProductsResult = z.array(ProductResult);
  const parsedProducts = ProductsResult.parse(productsList);

  return parsedProducts;
};

const makeShopifyRequest = async (query, variables, buyerIP) => {
  const isSSR = import.meta.env.SSR;
  const apiUrl = `https://the-velvet-cell.myshopify.com/api/2023-01/graphql.json`;

  function getOptions() {
    // If the request is made from the server, we need to pass the private access token and the buyer IP
    isSSR &&
      !buyerIP &&
      console.error(
        `🔴 No buyer IP provided => make sure to pass the buyer IP when making a server side Shopify request.`
      );

    const privateShopifyAccessToken = "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";
    const publicShopifyAccessToken = "9d5acf2d409889e2ec241ac43b795a00";

    const options = {
      method: "POST",
      headers: {},
      body: JSON.stringify({ query, variables }),
    };

    // Check if the Shopify request is made from the server or the client
    if (isSSR) {
      options.headers = {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": privateShopifyAccessToken,
        "Shopify-Storefront-Buyer-IP": buyerIP,
      };
      return options;
    }
    options.headers = {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": publicShopifyAccessToken,
    };

    return options;
  }

  const response = await fetch(apiUrl, getOptions());

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${body}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  return json.data;
};

const ProductsQuery = `#graphql
query ($first: Int!) {
    productVariants(first: $first) {
      nodes {
        id
        sku
      }
    }
  }
`;
