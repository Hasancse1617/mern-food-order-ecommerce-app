const app = require('express');
const { googleLogin, facebookLogin } = require('../../controllers/admin/SocialController');
const { createUser, allUser, deleteUser, loginValidations, userLogin, editUser, updateUser, updateUserPassword, forgotPassword, resetPassword } = require('../../controllers/admin/UserController');
const router = app.Router();
const auth = require('../../utils/auth');

router.post("/login", loginValidations, userLogin);
router.get("/all-user/:page", auth, allUser);
router.post("/create-user", auth, createUser);
router.get("/delete-user/:id", auth, deleteUser);
router.get("/edit-user/:id", auth, editUser);
router.post("/update-user/:id", auth, updateUser);
router.post("/update-user-password/:id", auth, updateUserPassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);

module.exports = router;