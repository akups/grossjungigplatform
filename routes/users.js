const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
/* Here we'll write the routes dedicated to handle the user logic (auth) */
//2.

router.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  User.findOne({ email: email })
    .then((found) => {
      //console.log("FOUND?", found);
      if (found) {
        return res.status(400).json({ message: "This email already exists" });
      }
      return bcrypt
        .genSalt()
        .then((salt) => {
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          console.log(name, role, email, password);
          console.log("before creating user");
          return User.create({
            name: name,
            role: role,
            email: email,
            password: hash,
          });
        })
        .then((newUser) => {
          // console.log("HELLO", newUser);
          // passport login
          console.log("before automatic login");
          req.login(newUser, (err) => {
            if (err) {
              console.log("error login", err);
              res.status(500).json({ message: "Error while logging in" });
            } else {
              console.log("sending back the user");
              res.json(newUser);
            }
          });
        });
    })
    .catch((err) => {
      console.log("nothing workerd", err);
      res.status(500).json({ message: "Error while authorizing" });
    });
});

//3)
router.post("/login", (req, res, next) => {
  console.log("backenduser", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error while logging in" });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({ message: info.message });
    }
    // passport req.login
    req.login(user, (err) => {
      console.log("USER???????", user);
      if (err) {
        return res.status(500).json({ message: "Error while logging in" });
      }
      res.json(user);
    });
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  // passport logout function
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  //console.log("USER LOGGED IN", req.user);
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});

module.exports = router;
