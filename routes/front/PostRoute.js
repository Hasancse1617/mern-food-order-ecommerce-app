const app = require('express');
const { allPost, allCatPost, recentPosts, postCategories, allSearchPost, singlePost, addComment, allComment, addReply } = require('../../controllers/front/PostController');
const router = app.Router();

router.get("/posts", allPost);
router.get("/single-post/:url", singlePost);
router.get("/cat-posts/:url/:page", allCatPost);
router.get("/search-posts/:search/:page", allSearchPost);
router.get("/recent-posts/:url?", recentPosts);
router.get("/post-categories", postCategories);
router.post("/add-comment", addComment);
router.post("/add-reply", addReply);
router.get("/all-comment/:url", allComment);

module.exports = router;