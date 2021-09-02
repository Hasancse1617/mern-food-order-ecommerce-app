const app = require('express');
const { createPost, allPost, statusPost, editPost, updatePost, deletePost } = require('../../controllers/admin/PostController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-post/:page", auth, allPost);
router.post("/create-post", auth, createPost);
router.get("/edit-post/:id", auth, editPost);
router.post("/update-post/:id", auth, updatePost);
router.get("/delete-post/:id", auth, deletePost);
router.post("/status-post", auth, statusPost);

module.exports = router;