const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    msnv: { type: Number, unique: true },
    hoTenNV: { type: String, required: true },
    chucVu: String,
    diaChi: String,
    soDienThoai: String
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

StaffSchema.pre('save', async function (next) {
    if (!this.msnv) {
        const lastStaff = await mongoose.model('Staff').findOne().sort({ msnv: -1 });
        this.msnv = lastStaff ? lastStaff.msnv + 1 : 0;
    }
    next();
});

module.exports = mongoose.model('Staff', StaffSchema);
