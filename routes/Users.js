const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Model/User");
const Film = require("../Model/Film");
const Kuburan = require("../Model/Kuburan");
users.use(cors());

process.env.SCRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + " registered!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists!" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SCRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exist!" });
        }
      } else {
        res.json({ error: "User does not exist!" });
      }
    })
    .catch(err => {
      res.send("err" + err);
    });
});

users.post("/admin", (req, res) => {
  User.findOne({
    email: "admin@gmail.com"
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SCRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exist!" });
        }
      } else {
        res.json({ error: "User does not exist!" });
      }
    })
    .catch(err => {
      res.send("err" + err);
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(req.headers["authorization"], process.env.SCRET_KEY);

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist!");
      }
    })
    .catch(err => {
      res.send("error" + err);
    });
});

users.get("/homeuser", (req, res, next) => {
  Kuburan.find({})
    .then(function(kuburan_db) {
      res.json(kuburan_db);
    })
    .catch(function(err) {
      res.json(err);
    });
});

users.get("/home", (req, res, next) => {
  Kuburan.find({})
    .then(function(kuburan_db) {
      res.json(kuburan_db);
    })
    .catch(function(err) {
      res.json(err);
    });
});

users.delete("/home/delete/:id", (req, res, next) => {
  Kuburan.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

users.get("/home/edit/:id", (req, res, next) => {
  Kuburan.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

users.put("/home/update/:id", (req, res, next) => {
  Kuburan.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Kuburan updated successfully !");
      }
    }
  );
});

//------------- CRUD ---------------//
users.post("/film", (req, res) => {
  const today = new Date();
  const userData = {
    nama_kuburan: req.body.nama_kuburan,
    alamat_kuburan: req.body.alamat_kuburan,
    description: req.body.description,
    price: req.body.price,
    created: today
  };
  Kuburan.create(userData)
    .then(user => {
      res.json({
        status: "1",
        message: "Data kuburan berhasil ditambahkan!"
      });
    })
    .catch(err => {
      res.send("error = " + err);
    });
});

module.exports = users;
