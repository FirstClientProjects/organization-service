const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);