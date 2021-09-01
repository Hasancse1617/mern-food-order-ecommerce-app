const app = require('express');
const { allCategory } = require('../../controllers/front/CategoryController');
const router = app.Router();

router.get("/categories", allCategory);

module.exports = router;