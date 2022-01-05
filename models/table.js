const mongoose = require(`mongoose`);

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dsc: {
    type: String
  },
  resultIDs: {
    type: Array,
  },
  resultProbs: {
    type: Array
  },
  userID: {
    type: String
  }
});

module.exports = mongoose.model(`Table`, tableSchema);