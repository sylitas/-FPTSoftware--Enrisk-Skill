const DYNAMO_DB = {
  TABLE: {
    USERS_TABLE: {
      NAME: process.env.usersTableName,
      INDEX_EMAIL: process.env.usersTableIndexEmail,
    },
  },
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

export { DYNAMO_DB, PERMISSION, ROLE };
