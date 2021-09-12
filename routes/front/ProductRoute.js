const app = require('express');
const { popularProducts, allProduct, hotProducts, singleProduct, relatedProducts, sizePrice, addToCart, fetchCartItems, updateCartItem, deleteCartItem, applyCoupon, deliveryAddress, Checkout } = require('../../controllers/front/ProductController');
const { addReview, allReview, addHeart, allWishlist, deleteWishlist } = require('../../controllers/front/ReviewController');
const router = app.Router();
const auth = require('../../utils/auth');

router.post("/products", allProduct);
router.get("/hot-products", hotProducts);
router.get("/single-product/:code", singleProduct);
router.get("/related-products/:code", relatedProducts);
router.get("/popular-products", popularProducts);
router.post("/size-price", sizePrice);
router.post("/add-to-cart", auth, addToCart);
router.get("/fetch-cart-items/:userId", auth, fetchCartItems);
router.post("/update-cart-item", auth, updateCartItem);
router.get("/delete-cart-item/:cartId", auth, deleteCartItem);
router.post("/apply-coupon", auth, applyCoupon);
router.get("/delivery-address/:user_id", auth, deliveryAddress);
router.post("/checkout", auth, Checkout);

//Review route
router.post("/all-review", auth, allReview);
router.post("/add-review", auth, addReview);
router.post("/add-heart", auth, addHeart);
router.get("/all-wishlist/:id", auth, allWishlist);
router.get("/delete-wishlist/:id", auth, deleteWishlist);

module.exports = router;