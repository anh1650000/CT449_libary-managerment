const Staff = require('../models/Staff');
const Account = require('../models/Account');
const bcrypt = require('bcryptjs');

// Tạo mới một nhân viên VÀ tài khoản admin cho họ
const createAdmin = async (req, res) => {
    const { email, password, hoTenNV, chucVu, diaChi, soDienThoai } = req.body;
    try {
        const accountExists = await Account.findOne({ email });
        if (accountExists) return res.status(400).json({ message: 'Email already in use' });

        const newStaff = new Staff({ hoTenNV, chucVu, diaChi, soDienThoai });
        await newStaff.save();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAccount = new Account({
            email,
            password: hashedPassword,
            role: 'admin',
            refId: newStaff.msnv,
            refModel: 'Staff'
        });
        await newAccount.save();

        res.status(201).json({ staff: newStaff, account: newAccount });
    } catch (error) {
        res.status(500).json({ message: 'Error creating new admin', error: error.message });
    }
};

const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.status(200).json(staff);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Unable to update staff member' });
    }
};

// Xóa nhân viên và tài khoản admin của họ
const deleteStaff = async (req, res) => {
    try {
        const staffId = req.params.id;
        const staff = await Staff.findById(staffId);
        if (staff) await Account.findOneAndDelete({ refId: staff.msnv, refModel: 'Staff' });
        const deletedStaff = await Staff.findByIdAndDelete(staffId);
        if (!deletedStaff) return res.status(404).json({ message: 'Staff member not found' });
        res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting staff member' });
    }
};

const getAllStaff = async (req, res) => {
    try {
        const staffList = await Staff.find();
        res.status(200).json(staffList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving staff list' });
    }
};

const getStaffByMsnv = async (req, res) => {
    try {
        const staff = await Staff.findOne({ msnv: Number(req.params.msnv) });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving staff member' });
    }
};

module.exports = {
    createAdmin,
    updateStaff,
    deleteStaff,
    getAllStaff,
    getStaffByMsnv
};