const app = require('express');
const { orders, singleOrder, updateOrderStatus } = require('../../controllers/admin/OrderController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-order/:page", auth, orders);
router.get("/single-order/:id", auth, singleOrder);
router.post("/update-order-status", auth, updateOrderStatus);

module.exports = router;