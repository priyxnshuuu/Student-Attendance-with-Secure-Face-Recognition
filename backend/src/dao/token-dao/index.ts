import { generateAuthToken } from "./generateToken.dao";
import { generateTokenForUsers } from "./generateTokenForUsers";
import { getToken } from "./getToken";

import { verifyTokenDao } from "./verifyToken.dao";

export const tokenDao = {
  generateAuthToken: generateAuthToken,
  verifyTokenDao: verifyTokenDao,
  generateTokenForUsers: generateTokenForUsers,
  getToken:getToken,
};
