const app = require('express');
const { createPost, categories, allPost, statusPost, editPost, updatePost, deletePost } = require('../../controllers/admin/PostController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-post/:user_type/:page", auth, allPost);
router.get("/categories", auth, categories);
router.post("/create-post/:user_type", auth, createPost);
router.get("/edit-post/:user_type/:id", auth, editPost);
router.post("/update-post/:id", auth, updatePost);
router.get("/delete-post/:user_type/:id", auth, deletePost);
router.post("/status-post", auth, statusPost);

module.exports = router;