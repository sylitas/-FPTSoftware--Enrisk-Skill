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

const PERMISSION = {
  READ: ['GET'],
  MODIFY: ['PUT', 'POST', 'PATCH'],
  DELETE: ['DELETE'],
};

const ROLE = {
  ADMIN: ['READ', 'MODIFY', 'DELETE'],
  CUSTOMER: ['READ'],
  PRODUCT_OWNER: ['READ', 'MODIFY'],
};

export { DYNAMO_DB, PERMISSION, ROLE, PRODUCT_STATUS };
