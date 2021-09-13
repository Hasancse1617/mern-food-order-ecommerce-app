const app = require('express');
const { payment } = require('../../controllers/front/PaymentController');
const router = app.Router();

router.post("/pay/:amount", payment);

module.exports = router;