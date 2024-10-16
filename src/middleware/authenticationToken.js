import jwt from "jsonwebtoken";

export const adminAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];

  //Checking if the token is null
  if (!token) {
    return res.status(401).send("Authorization failed. No access token.");
  }

  //Verifying if the token is valid.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err, "error");
        return res.status(403).send("Could not verify token");
      }

      req.user = user;
    });
  next();
}