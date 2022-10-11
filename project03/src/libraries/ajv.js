import Ajv from "ajv";

const ajv = new Ajv({ useDefaults: true });

export const validation = ({ schema, data }) => {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  if (isValid) {
    return { isVerified: true, data };
  }
  return { isVerified: false };
};
