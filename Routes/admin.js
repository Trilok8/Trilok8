
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productID', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

router.get('/admin-product-list', adminController.getAdminProductList);

router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;