const mongoose = require(`mongoose`);

const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(`Result`, resultSchema);