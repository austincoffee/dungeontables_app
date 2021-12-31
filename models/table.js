const mongoose = require(`mongoose`);

// set up constraint: can't delete Result if it exists in a table
// https://youtu.be/UIf1Lh9OZ-k?t=1205

const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dsc: {
        type: String
    },
    resultIDsResultNamesProbs: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model(`Table`, tableSchema);