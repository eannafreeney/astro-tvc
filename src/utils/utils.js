import _ from "lodash";

export const formatPrice = (currency = "EUR", value = 0) =>
  Intl.NumberFormat("en-US", {
    currency,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
