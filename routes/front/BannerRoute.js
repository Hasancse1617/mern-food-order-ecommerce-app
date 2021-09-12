const app = require('express');
const { allBanner } = require('../../controllers/front/BannerController');
const router = app.Router();

router.get("/banners", allBanner);

module.exports = router;