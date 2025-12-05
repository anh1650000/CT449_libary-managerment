const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    maDocGia: { type: Number, unique: true },
    hoLot: { type: String, required: true },
    ten: { type: String, required: true },
    ngaySinh: Date,
    phai: { type: String, enum: ['Nam', 'Nữ', 'Khác'], default: 'Khác' },
    diaChi: String,
    dienThoai: String
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.maDocGia && this.maDocGia !== 0) {
        const lastUser = await mongoose.model('User').findOne().sort({ maDocGia: -1 });
        this.maDocGia = lastUser ? lastUser.maDocGia + 1 : 0;
        console.log('Generated maDocGia:', this.maDocGia);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);