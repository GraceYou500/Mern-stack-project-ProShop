import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

// @description    Fetch all products
// @route          GET  /api/products
// @access         Public
router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProducts);

// @description    Fetch single product
// @route          GET  /api/products/:id
// @access         Public
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;
