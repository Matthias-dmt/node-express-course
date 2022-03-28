const express = require('express')
const { getAllProducts, getAllProductsStatic } = require('../controllers/products')

const router = express.Router()

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)
// .post();
// router.route('/:id').get().patch().delete();

module.exports = router