import apiInfo from "./api.js";
import controller from "../controller/index.js";
import { validation } from "../libraries/ajv.js";

const validateRequest = async (req, res, next) => {
  const { body, mappingHelper } = req;
  if (!body || !mappingHelper.schema || mappingHelper.schema === "") {
    return next();
  }

  const { default: schema } = await import(
    `../schema/${mappingHelper.schema}.schema.js`
  );

  const { isVerified, data } = validation({ schema, data: body });
  if (!isVerified) {
    res.status(422).json({ message: "Your input params is incorrect!" });
    return;
  }
  req.body = data;
  return next();
};

const mappingFunction = async (req, res) => {
  const { funcName } = req.mappingHelper;
  console.log("😎 Sylitas | funcName : ", funcName);
  console.log("😎 Sylitas | controller : ", controller);
  const func = controller[funcName];
  await func(req, res);
};

export const setupRouter = (app) => {
  Object.keys(apiInfo).forEach((route) => {
    const routeMapping = apiInfo[route];
    app[routeMapping.method.toLowerCase()](
      routeMapping.endpoint,
      (req, res, next) => {
        req.mappingHelper = {
          funcName: route,
          schema: routeMapping.schema,
        };
        next();
      },
      validateRequest,
      mappingFunction
    );
  });
};
