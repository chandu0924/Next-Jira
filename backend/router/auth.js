const express = require("express");
const passport = require("passport");
const Authentication = require("../controllers/authentication");
require("../services/passport");

const router = express.Router();

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

router.get("/", (req, res) => {
  res.send("Express Server with JWT Authentication");
});

router.post("/login", requireSignIn, Authentication.signin);
router.post("/register", Authentication.signup);
router.get("/validate", requireAuth, (req, res) => {
  res.send({ user: req.user.email });
});

module.exports = router;
