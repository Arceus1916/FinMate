const express = require("express");
const {
  addIncome,
  getAllIncome,  // Change this to match the function name
  deleteIncome,
  downloadIncomeExcel
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);  // Update here as well
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
