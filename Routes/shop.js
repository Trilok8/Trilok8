const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop-controller');


router.get('/',shopController.getIndex);

router.get('/product-list', shopController.getProductList);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteItem);

router.post('/create-order',shopController.postOrder);

router.get('/orders', shopController.getOrders);

router.get('/product/:productID', shopController.getProductDetail);

module.exports = router