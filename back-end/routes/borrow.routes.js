const express = require('express');
const router = express.Router();
const { createBorrow, getAllBorrows, getBorrowHistoryByUser, markAsReturned, deleteBorrow } = require('../controllers/borrow.controller');

router.post('/', createBorrow);
router.get('/', getAllBorrows);
router.get('/me/:userId', getBorrowHistoryByUser);
router.patch('/return/:id', markAsReturned);
router.delete('/:id', deleteBorrow);

module.exports = router;
