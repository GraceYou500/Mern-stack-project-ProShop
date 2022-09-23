import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// @description    Fetch all products
// @route          GET  /api/products
// @access         Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // throw new Error('Some Error');

    res.json(products);
  })
);

// @description    Fetch single product
// @route          GET  /api/products/:id
// @access         Public

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    console.log('product & id', req.params.id, res.statusCode);

    const product = await Product.findById(req.params.id);
    // const product = undefined;
    console.log('product & id2');
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
