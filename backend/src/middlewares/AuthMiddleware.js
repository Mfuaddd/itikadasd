import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyAccess = (roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.log("Token is required");
        return res.send("Token is required");
      }

      const [bearer, token] = authHeader.split(" ");
      if (bearer !== "Bearer") {
        console.log("Token is not valid");
        return res.send("Token is not valid");
      }

      const decode = jwt.verify(token, process.env.JWT_KEY);
      res.locals.decode = decode;
      if (!roles.includes(decode.role)) {
        console.log("You Dont Have Access");
        return res.status(401).send("You Dont Have Access");
      }

      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).send(error.message);
    }
  };
};
