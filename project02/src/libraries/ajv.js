import Ajv from 'ajv';

const ajv = new Ajv({ useDefaults: true });

const validation = ({ schema, data }) => {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  if (isValid) {
    return { isVerified: true, data };
  }
  return { isVerified: false };
};

export default validation;
