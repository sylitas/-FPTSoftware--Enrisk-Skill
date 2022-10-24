export const DYNAMO_DB = {
  TABLE: {
    USERS_TABLE: {
      NAME: process.env.usersTableName,
      INDEX_EMAIL: process.env.usersTableIndexEmail,
    },
    PRODUCTS_TABLE: {
      NAME: process.env.productsTableName,
      INDEX_USER_ID: process.env.productsTableIndexUserId,
    },
    ORDERS_TABLE: {
      NAME: process.env.ordersTableName,
      INDEX_USER_ID: process.env.ordersTableIndexUserId,
    },
  },
};

export const PRODUCT_STATUS = {
  CREATED: 'CREATED',
  VERIFIED: 'VERIFIED',
  DELETED: 'DELETED',
  BUYABLE: 'BUYABLE',
  SOLD_OUT: 'SOLD_OUT',
};

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
};

export const DELIVER_STATUS = {
  NONE: 'NONE',
  PREPARE: 'PREPARE',
  PENDING: 'PENDING',
  DELIVERED: 'DELIVERED',
};

export const CURRENCY = process.env.Currency;
