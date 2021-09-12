const app = require('express');
const { allBanner, createBanner, editBanner, updateBanner, deleteBanner, statusBanner } = require('../../controllers/admin/BannerController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-banner/:page", auth, allBanner);
router.post("/create-banner", auth, createBanner);
router.get("/edit-banner/:id", auth, editBanner);
router.post("/update-banner/:id", auth, updateBanner);
router.get("/delete-banner/:id", auth, deleteBanner);
router.post("/status-banner", auth, statusBanner);

module.exports = router;