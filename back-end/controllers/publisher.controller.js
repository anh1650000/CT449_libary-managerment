const Publisher = require('../models/Publisher');
const Book = require('../models/Book');

const createPublisher = async (req, res) => {
  try {
    const newPublisher = new Publisher(req.body);
    await newPublisher.save();
    res.status(201).json(newPublisher);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Unable to create publisher' });
  }
};

const getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json(publishers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving publishers list' });
  }
};

const updatePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publisher) {
      return res.status(404).json({ message: 'Publisher not found' });
    }
    res.status(200).json(publisher);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Unable to update publisher' });
  }
};

const deletePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) return res.status(404).json({ message: 'Publisher not found' });

    const booksWithPublisher = await Book.find({ maNXB: publisher.maNXB });
    if (booksWithPublisher.length > 0) {
      return res.status(400).json({ message: 'Cannot delete this publisher as it has associated books.' });
    }

    const deletedPublisher = await Publisher.findByIdAndDelete(req.params.id);
    if (!deletedPublisher) {
      return res.status(404).json({ message: 'Publisher not found' });
    }
    res.status(200).json({ message: 'Publisher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting publisher' });
  }
};

module.exports = {
  createPublisher,
  getAllPublishers,
  deletePublisher,
  updatePublisher
};
