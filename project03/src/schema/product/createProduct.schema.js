export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        tag: {
          type: 'string',
          enum: ['books', 'housewares', 'electronics', 'others'],
        },
        productInfo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 1,
            },
            size: {
              type: 'string',
              minLength: 1,
              pattern: '/^[0-9]+$/',
            },
            description: {
              type: 'string',
              minLength: 1,
            },
          },
          required: ['name'],
        },
        price: {
          type: 'number',
          exclusiveMinimum: 0,
        },
        amount: {
          type: 'integer',
        },
      },
      required: ['tag', 'productInfo', 'price', 'amount'],
    },
  },
  required: ['body'],
};
