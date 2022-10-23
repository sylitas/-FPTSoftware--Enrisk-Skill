const DYNAMO_DB = {
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
      NAME: process.env.ordersTable,
      INDEX_USER_ID: process.env.ordersTableIndexUserId,
    },
  },
};

const PRODUCT_STATUS = {
  CREATED: 'CREATED',
  VERIFIED: 'VERIFIED',
  DELETED: 'DELETED',
  BUYABLE: 'BUYABLE',
  SOLD_OUT: 'SOLD_OUT',
};

export { DYNAMO_DB, PRODUCT_STATUS };
