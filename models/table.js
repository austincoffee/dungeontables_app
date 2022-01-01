const mongoose = require(`mongoose`);

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
    },
    resultIDs: {
        type: Array,
    },
    resultProbs: {
        type: Array
    }
});

// tableSchema.pre(`remove`, async function(next) {
//     try {
//         const allTables = await Table.find();
//         for (let i = 0; i < allTables.length; i++) {
//             for (let i = 0; i < allTables[i].resultIDsResultNamesProbs.length; i++) {
//                 if (allTables[i].resultIDsResultNamesProbs[i][0] === this.id) {
//                     throw `Cannot delete a Table that is part of a Table.`;
//                 };
//             };
//         };
//         next();
//     } catch (e) {
//         console.log(e);
//         next(e);
//     };
// });

module.exports = mongoose.model(`Table`, tableSchema);