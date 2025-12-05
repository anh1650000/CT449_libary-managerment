const Account = require('../models/Account')
const User = require('../models/User')
const Staff = require('../models/Staff')
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  try {
    const { email, password, maDocGia } = req.body;

    if (!email || !password || maDocGia === undefined)
      return res.status(400).json({ message: 'Email, password, and maDocGia are required' });

    if (password.trim().length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });

    const accountExists = await Account.findOne({ email });
    if (accountExists) return res.status(400).json({ message: 'This email is already registered' });

    const user = await User.findOne({ maDocGia: Number(maDocGia) });
    if (!user) return res.status(404).json({ message: 'Reader not found with this code' });

    const hashedPass = await bcrypt.hash(password, 10);
    const newAccount = new Account({
      email,
      password: hashedPass,
      role: 'user',
      refId: user.maDocGia,
      refModel: 'User'
    });

    await newAccount.save();
    res.status(201).json({ message: 'Account registered successfully', account: newAccount });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(400).json({ message: 'Failed to register account', error: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });
    if (!account) return res.status(404).json({ message: "Account not found" });

    const match = await bcrypt.compare(password, account.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    let userInfo = {};

    if (account.refModel === 'User') {
      const user = await User.findOne({ maDocGia: account.refId });
      if (user) userInfo = { maDocGia: user.maDocGia, fullName: `${user.hoLot} ${user.ten}`, email: account.email, role: account.role }
    } else if (account.refModel === 'Staff') {
      const staff = await Staff.findOne({ msnv: account.refId });
      if (staff) userInfo = { msnv: staff.msnv, hoTenNV: staff.hoTenNV, chucVu: staff.chucVu, role: account.role };
    }

    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: account.role,
      userInfo
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};

const getCurrentAccount = async (req, res) => {
  try {
    const { email } = req.params
    const account = await Account.findOne({ email })
    if (!account) return res.status(404).json({ message: 'Account not found' })

    res.status(200).json(account)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving account information' })
  }
}

module.exports = {
  getCurrentAccount,
  login,
  register
}