const mongoose = require(`mongoose`);

// set up constraint: can't delete Result if it exists in a table
// https://youtu.be/UIf1Lh9OZ-k?t=1205

const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    href: {
        type: String
    },
    dsc: {
        type: String
    }
    // source: {
    //     sourceName: {
    //         type: String,
    //         required: false
    //     },
    //     sourceLink: {
    //         type: String,
    //         required: false
    //     }
    // }
});

module.exports = mongoose.model(`Result`, resultSchema);