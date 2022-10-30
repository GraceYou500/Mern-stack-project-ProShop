import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

// @description    Fetch all products
// @route          GET  /api/products
// @access         Public
router.route('/').get(getProducts);

// @description    Fetch single product
// @route          GET  /api/products/:id
// @access         Public
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
