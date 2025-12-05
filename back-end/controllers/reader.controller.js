const User = require('../models/User');
const Account = require('../models/Account');

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toJSON());
  } catch (error) {
    console.error('Error creating reader:', error.message);
    res.status(400).json({ message: 'Unable to create reader' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving readers list:', error.message);
    res.status(500).json({ message: 'Unable to retrieve readers list' });
  }
};

const getUserByMaDocGia = async (req, res) => {
  try {
    const user = await User.findOne({ maDocGia: Number(req.params.maDocGia) });
    if (!user) {
      return res.status(404).json({ message: 'Reader not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving reader' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Reader not found for update' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Unable to update reader' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) await Account.findOneAndDelete({ refId: user.maDocGia, refModel: 'User' });
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Reader not found' });
    }
    res.status(200).json({ message: 'Reader deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting reader' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByMaDocGia,
  updateUser,
  deleteUser
};
