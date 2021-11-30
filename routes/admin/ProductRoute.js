const app = require('express');
const { allProduct, allCategories, createProduct, statusProduct, editProduct, updateProduct, deleteProduct, allImage, addProductImage, deleteProductImage, statusProductImage, addAttribute, allAttribute, statusProductAttribute, deleteProductAttribute } = require('../../controllers/admin/ProductController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get("/all-product/:user_type/:page", auth, allProduct);
router.get("/all-categories", auth, allCategories);
router.post("/create-product/:user_type", auth, createProduct);
router.get("/edit-product/:user_type/:id", auth, editProduct);
router.post("/update-product/:id", auth, updateProduct);
router.get("/delete-product/:user_type/:id", auth, deleteProduct);
router.post("/status-product", auth, statusProduct);
//All Image Route
router.get("/all-images/:id", auth, allImage);
router.post("/add-product-images/:id", auth, addProductImage);
router.get("/delete-product-image/:id", auth, deleteProductImage);
router.post("/status-image", auth, statusProductImage);
//All Attribute Route
router.get("/all-atributes/:id", auth, allAttribute);
router.post("/add-product-attributes/:id", auth, addAttribute);
router.post("/status-attribute", auth, statusProductAttribute);
router.get("/delete-product-attribute/:id", auth, deleteProductAttribute);

module.exports = router;