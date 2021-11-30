const app = require('express');
const { googleLogin, facebookLogin } = require('../../controllers/admin/SocialController');
const { createUser, allUser, deleteUser, loginValidations, userLogin, editUser, updateUser, updateUserPassword, forgotPassword, resetPassword } = require('../../controllers/admin/UserController');
const { addRole, fetchRole, fetchPermission, editRole, updateRole } = require('../../controllers/admin/RoleController');
const router = app.Router();
const auth = require('../../utils/auth');

router.post("/login", loginValidations, userLogin);
router.get("/all-user/:user_type/:page", auth, allUser);
router.post("/create-user/:user_type", auth, createUser);
router.get("/delete-user/:user_type/:id", auth, deleteUser);
router.get("/edit-user/:id", auth, editUser);
router.post("/update-user/:id", auth, updateUser);
router.post("/update-user-password/:id", auth, updateUserPassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);
//Roles Route
router.get("/all-role/:user_type", auth, fetchRole);
router.post("/add-role/:user_type", auth, addRole);
router.get("/all-permission", auth, fetchPermission);
router.get("/edit-role/:user_type/:id", auth, editRole);
router.post("/update-role/:id", auth, updateRole);

module.exports = router;