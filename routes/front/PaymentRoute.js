const app = require('express');
const { payment } = require('../../controllers/front/PaymentController');
const router = app.Router();

router.get("/pay", payment);

module.exports = router;