import { configSchema } from "./schemas";

const defineConfig = {
  shopifyShop: import.meta.env.PUBLIC_SHOPIFY_SHOP,
  publicShopifyAccessToken: import.meta.env
    .PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  privateShopifyAccessToken: import.meta.env
    .PRIVATE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    ? import.meta.env.PRIVATE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    : "",
  apiVersion: "2023-01",
  airtableBaseId: import.meta.env.PRIVATE_AIRTABLE_API,
  airtableAPI: import.meta.env.PRIVATE_AIRTABLE_BASE_ID,
};

export const config = configSchema.parse(defineConfig);
