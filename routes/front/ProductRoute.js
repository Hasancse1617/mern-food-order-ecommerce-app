const app = require('express');
const { allProduct, hotProducts, singleProduct, relatedProducts, sizePrice, addToCart, fetchCartItems, updateCartItem, deleteCartItem } = require('../../controllers/front/ProductController');
const router = app.Router();

router.post("/products", allProduct);
router.get("/hot-products", hotProducts);
router.get("/single-product/:code", singleProduct);
router.get("/related-products/:code", relatedProducts);
router.post("/size-price", sizePrice);
router.post("/add-to-cart", addToCart);
router.get("/fetch-cart-items/:userId", fetchCartItems);
router.post("/update-cart-item", updateCartItem);
router.get("/delete-cart-item/:cartId", deleteCartItem);

module.exports = router;