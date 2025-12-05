const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
    borrowerId: {
        type: Number,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['User', 'Staff']
    },
    bookId: {
        type: Number,
        ref: 'Book',
        required: true
    },
    ngayMuon: { type: Date, default: Date.now },
    ngayTra: { type: Date },
    ngayThucTra: { type: Date },
    status: {
        type: String,
        enum: ['Đang mượn', 'Đã trả'],
        default: 'Đang mượn'
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Borrow', BorrowSchema);