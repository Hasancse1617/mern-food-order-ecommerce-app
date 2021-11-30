const app = require('express');
const { allCoupon, createCoupon, deleteCoupon, editCoupon, updateCoupon, statusCoupon } = require('../../controllers/admin/CouponController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-coupon/:user_type/:page", auth, allCoupon);
router.post("/create-coupon/:user_type", auth, createCoupon);
router.get("/edit-coupon/:user_type/:id", auth, editCoupon);
router.post("/update-coupon/:id", auth, updateCoupon);
router.get("/delete-coupon/:user_type/:id", auth, deleteCoupon);
router.post("/status-coupon", auth, statusCoupon);

module.exports = router;