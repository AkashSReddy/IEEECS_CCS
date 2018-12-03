var express = require("express");
var router = express.Router();
var Q_Database = require("../models/question");
var A_Database = require("../models/applicant");
var userService = require("../services/userService");
var userFunctions = require("../services/userFunctions");
var passport = require("passport");
var adminRouter = require("../routes/admin");
const auth = require("../middleware/authentication");
/* GET users listing. */

router.get("/fail", (req, res, next) => {
  res.send("Failed");
});

router.get("/loggedin", (req, res, next) => {
  res.send("Logged in");
});

router.get("/loggedout", (req, res, next) => {
  res.send("Logged logout");
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/fail",
    failureFlash: true
  })
);

router.post("/register", async (req, res, next) => {
  return userFunctions
    .addUser(req.body)
    .then(function() {
      res.redirect("/loggedin");
    })
    .catch(next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/loggedout");
});

router.get("/", (req, res, next) => {
  res.send("User router");
});
router.use("/", auth.isAdmin, adminRouter);

// router.get("/question", async (req, res, next) => {
//   try {
//     const stuff = await userService.setQuestions();
//     res.json(stuff);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;
