const xlsx = require('xlsx');
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (isNaN(new Date(date))) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getAllExpenses = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        const fileName = `expense_details_${new Date().toISOString()}.xlsx`;
        xlsx.writeFile(wb, fileName);
        res.download(fileName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
