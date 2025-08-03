const Transaction = require("../models/Transaction");

// @desc   Add new transaction
// @route  POST /transactions
exports.createTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;

    const newTransaction = new Transaction({
      amount,
      type,
      category,
      date,
      description,
      userId: req.userId, // set by verifyToken middleware
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

// @desc   Get all transactions for user
// @route  GET /transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("Get Transactions Error:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// @desc   Update a transaction
// @route  PUT /transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error("Update Transaction Error:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// @desc   Delete a transaction
// @route  DELETE /transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Delete Transaction Error:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
