const app = require('express');
const { orders, singleOrder, updateOrderStatus } = require('../../controllers/admin/OrderController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-order/:user_type/:page", auth, orders);
router.get("/single-order/:user_type/:id", auth, singleOrder);
router.post("/update-order-status", auth, updateOrderStatus);

module.exports = router;