const app = require('express');
const { allProduct, hotProducts, singleProduct, relatedProducts, sizePrice } = require('../../controllers/front/ProductController');
const router = app.Router();

router.post("/products", allProduct);
router.get("/hot-products", hotProducts);
router.get("/single-product/:code", singleProduct);
router.get("/related-products/:code", relatedProducts);
router.post("/size-price", sizePrice);

module.exports = router;