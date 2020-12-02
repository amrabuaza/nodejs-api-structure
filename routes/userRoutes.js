const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");
const methodNotAllowed = (req, res, next) => res.status(405).send();

router.post("/login", authController.login).all(methodNotAllowed);
router.post("/signup", authController.signup).all(methodNotAllowed);

// Protect all routes after this middleware
router.use(authController.protect);

router.delete("/deleteMe", userController.deleteMe);

// Only admin have permission to access for the below APIs
router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
router.route("/me").get(userController.me);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  .all(methodNotAllowed);

module.exports = router;
