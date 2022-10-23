export default {
  type: 'object',
  properties: {
    query: {
      type: 'object',
      properties: {
        productIds: {
          type: 'string',
          minLength: 1,
        },
        limit: {
          type: 'string',
          minLength: 1,
        },
        paginateToken: {
          type: 'string',
          minLength: 1,
        },
        fields: {
          type: 'string',
          minLength: 1,
        },
      },
      required: [],
    },
  },
  required: ['query'],
};
