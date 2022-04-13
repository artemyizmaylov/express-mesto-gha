const router = require("express").Router();
const {
  getUser,
  getUsers,
  createUser,
} = require("../controllers/userControllers");

router.get("/users/:userId", getUser);
router.get("/users", getUsers);
router.post("/users", createUser);

module.exports = router;
