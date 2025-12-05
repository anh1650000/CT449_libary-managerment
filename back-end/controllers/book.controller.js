const Book = require('../models/Book');
const Borrow = require('../models/Borrow');
const Publisher = require('../models/Publisher');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        // Populate publisher cho tất cả sách
        const publishers = await Publisher.find();
        const booksWithPublisher = books.map(book => {
            const bookObj = book.toObject();
            bookObj.maNXB = publishers.find(p => p.maNXB === book.maNXB);
            return bookObj;
        });

        res.status(200).json(booksWithPublisher);
    } catch (error) {
        res.status(500).json({ message: 'Server error occurred' });
        console.error(error);
    }
};

const getBookByMaSach = async (req, res) => {
    try {
        const book = await Book.findOne({ maSach: Number(req.params.maSach) });
        if (!book) return res.status(404).json({ message: 'Book not found by code' });

        // Populate publisher thủ công vì maNXB là Number không phải ObjectId
        const publisher = await Publisher.findOne({ maNXB: book.maNXB });
        const bookWithPublisher = book.toObject();
        bookWithPublisher.maNXB = publisher;

        res.status(200).json(bookWithPublisher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching book by code' });
    }
};

const createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error);
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found for update' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Unable to update book' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found for deletion' });

        const activeBorrows = await Borrow.find({ bookId: book.maSach, status: 'Đang mượn' });

        if (activeBorrows.length > 0) {
            return res.status(400).json({ message: 'Cannot delete this book as it is currently borrowed.' });
        }

        await Book.findByIdAndDelete(bookId);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting book' });
    }
};

const getOutOfStockBooks = async (req, res) => {
    try {
        const outOfStockBooks = await Book.find({ soQuyen: 0 });
        res.status(200).json(outOfStockBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving out of stock books' });
    }
};

module.exports = {
    getAllBooks,
    getBookByMaSach,
    createBook,
    deleteBook,
    updateBook,
    getOutOfStockBooks
};