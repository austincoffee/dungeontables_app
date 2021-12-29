const mongoose = require(`mongoose`);

const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: false
    },
    dsc: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model(`Result`, resultSchema);