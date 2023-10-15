const express = require("express");
const router = express.Router();
const {
  userSignup,
  userUpdate,
  userLogin,
  getAllUsers,
  getSingleUser
} = require("../../controllers/auth.controllers");
const checkAuth = require("../../middleware/check-auth");

router.post("/signup", userSignup);
router.put("/update/:id", userUpdate);
router.post("/login", userLogin);
router.get("/user", checkAuth, getSingleUser);
router.get("/getallusers", getAllUsers);

module.exports = router;
