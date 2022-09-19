var jwt = require("jsonwebtoken");
const JWT_SECRET = "BITCH$PLZ";

const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using valid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET, function (err, decoded) {
      req.user = decoded.user;
      next();
    });

    // console.log(token);
    // console.log(data.user);
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using valid token" });
  }

  // console.log(data.user);
  // un updated
};

module.exports = fetchuser;
