const xlsx = require('xlsx');
const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure the date is properly formatted (e.g., if it comes as a string)
        const formattedDate = new Date(date);
        if (isNaN(formattedDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: formattedDate
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        const income = await Income.findByIdAndDelete(incomeId);

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toLocaleDateString(),  // Format the date for better readability in Excel
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.writeFile(wb, "income_details.xlsx");

        res.download('income_details.xlsx');
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
