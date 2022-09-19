const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "BITCH$PLZ";
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/login");

//Create User route: No login required

router.post(
  "/createuser",
  [
    body("name", "Enter a minimum 5 character name").isLength({ min: 5 }),
    // password must be at least 5 chars long
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a minimum 5 character password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // console.log(user);
        return res.status(500).send({ success, error: "already exist" });
      } else {
        var salt = await bcrypt.genSaltSync(10);
        let secPass = req.body.password;
        let hash = bcrypt.hashSync(secPass, salt);

        // let jwt = require("jsonwebtoken");
        let data = {
          user: {
            id: req.body._id,
          },
        };
        let token = jwt.sign(data, JWT_SECRET);

        let newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        // console.log(newUser);
        success = true;

        return res.json({ success, token });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  // router.get("/", async (req, res) => {
  //   // console.log(req.body);
  //   let newUser = await User.find({});
  //   res.send(newUser);
  // })
);

//Authenticate User route: No login required
router.post("/loginuser", [body("email", "Enter a valid email").isEmail(), body("password", "Enter a valid password").exists()], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email: email,
    });
    // console.log(user.password);
    const bcomp = bcrypt.compareSync(password, user.password);
    if (!bcomp) {
      return res.json({ error: "Enter valid creds please", success });
    }

    let data = {
      user: {
        id: user._id,
      },
    };

    // console.log(user.id);
    const token = jwt.sign(data, JWT_SECRET);
    success = true;
    return res.json({ token, success });
  } catch (error) {
    console.log(error);
    return res.json({ error, success });
  }
});

//Fetch User Details: Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    // console.log(req.user.id);
    let user = await User.findById(userId);
    // console.log(user);
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

// router.get("/")

module.exports = router;
//
