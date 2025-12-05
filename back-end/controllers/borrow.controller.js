const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

const createBorrow = async (req, res) => {
    try {
        const { borrowerId, onModel, bookId, ngayTra } = req.body;

        const book = await Book.findOne({ maSach: bookId });
        if (!book || book.soQuyen <= 0) {
            return res.status(400).json({ message: 'Book is out of stock or does not exist.' });
        }

        const currentBorrows = await Borrow.find({
            borrowerId: borrowerId,
            status: 'Đang mượn'
        });

        if (currentBorrows.length >= 3) {
            return res.status(400).json({ message: 'You have reached the maximum limit of 3 borrowed books. Please return a book before borrowing more.' });
        }

        const now = new Date();
        const hasOverdueBook = currentBorrows.some(borrow => new Date(borrow.ngayTra) < now);

        if (hasOverdueBook) {
            return res.status(400).json({ message: 'You have overdue books. Please return them before borrowing more.' });
        }

        const newBorrow = new Borrow({ borrowerId, onModel, bookId, ngayTra });
        await newBorrow.save();

        book.soQuyen = book.soQuyen - 1;
        await book.save();

        res.status(201).json(newBorrow);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Unable to create loan record' });
    }
};

const getBorrowHistoryByUser = async (req, res) => {
    try {
        const borrows = await Borrow.find({ borrowerId: Number(req.params.userId) });
        const User = require('../models/User');
        const Staff = require('../models/Staff');

        // Manually populate book data and borrower data
        const borrowsWithDetails = await Promise.all(
            borrows.map(async (borrow) => {
                const book = await Book.findOne({ maSach: borrow.bookId });

                // Populate borrower based on onModel
                let borrower = null;
                if (borrow.onModel === 'User') {
                    borrower = await User.findOne({ maDocGia: borrow.borrowerId });
                } else if (borrow.onModel === 'Staff') {
                    borrower = await Staff.findOne({ msnv: borrow.borrowerId });
                }

                return {
                    ...borrow.toObject(),
                    bookId: book,
                    borrowerId: borrower
                };
            })
        );

        res.status(200).json(borrowsWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user loan history' });
    }
};

const getAllBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find();
        const User = require('../models/User');
        const Staff = require('../models/Staff');

        // Manually populate book data and borrower data
        const borrowsWithDetails = await Promise.all(
            borrows.map(async (borrow) => {
                const book = await Book.findOne({ maSach: borrow.bookId });

                // Populate borrower based on onModel
                let borrower = null;
                if (borrow.onModel === 'User') {
                    borrower = await User.findOne({ maDocGia: borrow.borrowerId });
                } else if (borrow.onModel === 'Staff') {
                    borrower = await Staff.findOne({ msnv: borrow.borrowerId });
                }

                return {
                    ...borrow.toObject(),
                    bookId: book,
                    borrowerId: borrower
                };
            })
        );

        res.status(200).json(borrowsWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving loan records' });
    }
};

const markAsReturned = async (req, res) => {
    try {
        const borrowId = req.params.id;

        const borrow = await Borrow.findById(borrowId);
        if (!borrow) {
            return res.status(404).json({ message: 'Loan record not found' });
        }

        if (borrow.status === 'Đã trả') {
            return res.status(400).json({ message: 'This book has already been returned.' });
        }

        borrow.status = 'Đã trả';
        borrow.ngayThucTra = new Date();
        await borrow.save();

        const book = await Book.findOne({ maSach: borrow.bookId });
        if (book) {
            book.soQuyen = book.soQuyen + 1;
            await book.save();
        }

        res.status(200).json({ message: 'Book returned successfully', data: borrow });
    } catch (error) {
        console.error('Return error:', error.message);
        res.status(500).json({ message: 'Error updating loan status', error: error.message });
    }
};

const deleteBorrow = async (req, res) => {
    try {
        const deletedBorrow = await Borrow.findByIdAndDelete(req.params.id);
        if (!deletedBorrow) {
            return res.status(404).json({ message: 'Loan record not found' });
        }
        res.status(200).json({ message: 'Loan record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting loan record' });
    }
};

module.exports = {
    createBorrow,
    getBorrowHistoryByUser,
    getAllBorrows,
    markAsReturned,
    deleteBorrow
};