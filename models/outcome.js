const mongoose = require(`mongoose`);
const Table = require(`./table`);

const outcomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  href: {
    type: String
  },
  dsc: {
    type: String
  },
  // source: {
  //   sourceName: {
  //     type: String,
  //     required: false
  //   },
  //   sourceLink: {
  //     type: String,
  //     required: false
  //   }
  // }
});

module.exports = mongoose.model(`Outcome`, outcomeSchema);