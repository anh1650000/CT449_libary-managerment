const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    maSach: { type: Number, unique: true },
    tenSach: { type: String, required: true },
    tacGia: { type: String, required: true },
    donGia: Number,
    soQuyen: { type: Number, default: 1 },
    namXuatBan: Number,
    maNXB: { type: Number, ref: 'Publisher', required: true },
    hinhAnh: { type: String, default: '' }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

BookSchema.pre('save', async function (next) {
    if (!this.maSach) {
        const lastBook = await mongoose.model('Book').findOne().sort({ maSach: -1 });
        this.maSach = lastBook ? lastBook.maSach + 1 : 0;
    }
    next();
});

module.exports = mongoose.model('Book', BookSchema);
