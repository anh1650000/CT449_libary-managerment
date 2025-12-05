const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
    maNXB: { type: Number, unique: true },
    tenNXB: { type: String, required: true },
    diaChi: String
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

PublisherSchema.pre('save', async function (next) {
    if (!this.maNXB) {
        const lastPublisher = await mongoose.model('Publisher').findOne().sort({ maNXB: -1 });
        this.maNXB = lastPublisher ? lastPublisher.maNXB + 1 : 0;
    }
    next();
});

module.exports = mongoose.model('Publisher', PublisherSchema);
