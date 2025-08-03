const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../middleware/auth");
const verifyToken = require("../middleware/authMiddleware");

const {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// Add new transaction
router.post("/", verifyToken, createTransaction);

// Get all transactions of logged-in user
router.get("/", verifyToken, getAllTransactions);

// Update a transaction
router.put("/:id", verifyToken, updateTransaction);

// Delete a transaction
router.delete("/:id", verifyToken, deleteTransaction);

module.exports = router;
