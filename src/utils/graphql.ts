const CART_FRAGMENT = `#graphql
fragment cartFragment on Cart {
  id
  totalQuantity
  checkoutUrl
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ...on ProductVariant {
          id
          title
          image {
            url
            altText
            width
            height
          }
          product {
            handle
            title
          }
        }
      }
      cost {
        amountPerQuantity{
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;

const PRODUCT_FRAGMENT = `#graphql
fragment productFragment on Product {
  title
  handle
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      compareAtPrice {
        amount
        currencyCode
      }
      price {
        amount
        currencyCode
      }
    }
  }
}
`;

export const ProductsQuery = `#graphql
query ($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...productFragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ProductByHandleQuery = `#graphql
  query ($handle: String!) {
    product(handle: $handle) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ProductByIDQuery = `#graphql
  query ($id: ID!) {
    product(id: $id) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ProductRecommendationsQuery = `#graphql
  query ($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GetCartQuery = `#graphql
  query ($id: ID!) {
    cart(id: $id) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CreateCartMutation = `#graphql
  mutation ($id: ID!, $quantity: Int!) {
    cartCreate (input: { lines: [{ merchandiseId: $id, quantity: $quantity }] }) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const AddCartLinesMutation = `#graphql
  mutation ($cartId: ID!, $merchandiseId: ID!, $quantity: Int) {
    cartLinesAdd (cartId: $cartId, lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }]) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const RemoveCartLinesMutation = `#graphql
  mutation ($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove (cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;
