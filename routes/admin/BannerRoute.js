const app = require('express');
const { allBanner, createBanner, editBanner, updateBanner, deleteBanner, statusBanner } = require('../../controllers/admin/BannerController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-banner/:user_type/:page", auth, allBanner);
router.post("/create-banner/:user_type", auth, createBanner);
router.get("/edit-banner/:user_type/:id", auth, editBanner);
router.post("/update-banner/:id", auth, updateBanner);
router.get("/delete-banner/:user_type/:id", auth, deleteBanner);
router.post("/status-banner", auth, statusBanner);

module.exports = router;