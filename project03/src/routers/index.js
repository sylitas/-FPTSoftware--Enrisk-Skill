import apiInfo from './api';
import controller from '../controller/index';
import { validation } from '../libraries/ajv';
import { DYNAMO_DB } from '../libraries/const';
import { getEmailFromReq } from '../libraries/util';
import { query } from '../libraries/dynamoDB';

const validatePermission = async (req, res, next) => {
  const {
    mappingHelper: { isCheckRole },
  } = req;

  if (!isCheckRole || isCheckRole.length === 0) return next();
  try {
    const email = getEmailFromReq(req);
    const params = {
      TableName: DYNAMO_DB.TABLE.USERS_TABLE.NAME,
      IndexName: DYNAMO_DB.TABLE.USERS_TABLE.INDEX_EMAIL,
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames: { '#email': 'email' },
      ExpressionAttributeValues: { ':email': email },
    };
    const {
      Items: [userInfo],
    } = await query(params);
    const { role: userRole } = userInfo;

    if (isCheckRole.includes(userRole)) {
      req.userInfo = userInfo;
      return next();
    }
    return res.status(401).json({ message: 'You do not have permission!' });
  } catch (error) {
    return res.status(500).json({ message: error.message ? error.message : 'Internal server error' });
  }
};

const validateRequest = async (req, res, next) => {
  const { body, mappingHelper } = req;
  if (!body || !mappingHelper.schema || mappingHelper.schema === '') return next();

  const schema = await import(`../schema/${mappingHelper.schema}.schema.json`);

  const { isVerified } = validation({ schema, data: req });

  if (!isVerified) {
    return res.status(422).json({ message: 'Your input params is incorrect!' });
  }
  return next();
};

const mappingFunction = async (req, res) => {
  const { funcName } = req.mappingHelper;
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
          method: routeMapping.method,
          isCheckRole: routeMapping.isCheckRole,
        };
        next();
      },
      validatePermission,
      validateRequest,
      mappingFunction,
    );
  });
};
