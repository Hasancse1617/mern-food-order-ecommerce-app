const app = require('express');
const { createUser, verifyUser, loginUser, loginValidations } = require('../../controllers/front/UserController');
const router = app.Router();

router.post("/create-user", createUser);
router.post("/login-user", loginValidations, loginUser);
router.post("/verify-user/:token", verifyUser);

module.exports = router;