const verifyToken = token => {
  console.log(token);
  return token;
};

const isVerifyToken = (req, res, next) => {
  if (!req.token) return res.json({});
  if (!verifyToken(req.token)) return res.json({});
  next();
};

export default {
  isVerifyToken,
  verifyToken
};
