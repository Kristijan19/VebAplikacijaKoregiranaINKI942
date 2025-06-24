const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');
console.log('📦 Контролер:', controller);
console.log('🔍 getAllProducts:', typeof controller.getAllProducts);
console.log('🔍 createProduct:', typeof controller.createProduct);

router.get('/', controller.getAllProducts);
router.post('/', controller.createProduct);

module.exports = router;
