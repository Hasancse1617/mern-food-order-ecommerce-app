const app = require('express');
const { createCategory, allCategory, statusCategory, editCategory, updateCategory, deleteCategory } = require('../../controllers/admin/CategoryController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-category/:page", auth, allCategory);
router.post("/create-category", auth, createCategory);
router.get("/edit-category/:id", auth, editCategory);
router.post("/update-category/:id", auth, updateCategory);
router.get("/delete-category/:id", auth, deleteCategory);
router.post("/status-category", auth, statusCategory);

module.exports = router;