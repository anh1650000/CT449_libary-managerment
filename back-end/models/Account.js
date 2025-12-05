const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'] },
    refId: { type: Number, required: true },
    refModel: { type: String, enum: ['User', 'Staff'], required: true }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Account', AccountSchema);
