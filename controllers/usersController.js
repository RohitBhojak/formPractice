// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "Name must contain only alphabets";
const lengthErr = "Name must be between 1 to 10 characters";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`first name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`first name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`last name ${lengthErr}`),
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = matchedData(req);
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  },
];

exports.userUpdateGet = (req, res) => {
  usersStorage.getUser(req.params.id);
  res.render("updateUser", { title: "Update User", user: user });
};

exports.userUpdatePost = [
  validateUser,
  (req, res) => {
    const user = userStorage.getUser(req.param.id);
    const errors = validationResult(user);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", { title: "Update User", user: user, errors: errors.array() });
    }

    const { firstName, lastName } = matchedData(req);
    userStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  },
];
