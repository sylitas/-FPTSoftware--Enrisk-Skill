import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });
// eslint-disable-next-line spaced-comment
require('ajv-errors')(ajv /*, {singleError: true} */);

export const validation = ({ schema, data }) => {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  console.log('😎 Sylitas | validate : ', validate.errors);
  if (isValid) {
    return { isVerified: true };
  }
  return { isVerified: false };
};
