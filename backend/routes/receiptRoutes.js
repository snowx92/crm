const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getAllReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
} = require('../controllers/receiptController');

// All routes require authentication
router.use(verifyToken);

router.route('/')
  .get(getAllReceipts)
  .post(createReceipt);

router.route('/:id')
  .get(getReceiptById)
  .put(updateReceipt)
  .delete(deleteReceipt);

module.exports = router;
