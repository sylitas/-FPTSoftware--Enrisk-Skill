import Ajv from 'ajv';

const ajv = new Ajv();

export const validation = ({ schema, data }) => {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  if (isValid) {
    return { isVerified: true };
  }
  return { isVerified: false };
};
