const express = require("express");
const {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcel,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to add a new expense
router.post("/add", protect, addExpense);

// Route to get all expenses
router.get("/", protect, getAllExpenses);  // Changed to '/' to represent all expenses

// Route to download expenses in Excel format
router.get("/download", protect, downloadExpenseExcel);

// Route to delete a specific expense by ID
router.delete("/:id", protect, deleteExpense);

module.exports = router;
