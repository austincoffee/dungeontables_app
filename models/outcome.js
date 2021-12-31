const mongoose = require(`mongoose`);
const Table = require(`./table`);

// set up constraint: can't delete Outcome if it exists in a Table
// https://youtu.be/UIf1Lh9OZ-k?t=1205

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
    assocTables: {
        type: Array,
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

outcomeSchema.pre(`remove`, async function(next) {
    // iterate through all tables associated with Outcome
    // console.log(this);
    // for (let i = 0; i < this.assocTables.length; i++) {
    //     console.log(this.assocTables[i]);
    // }

    // first get an array of every single ID in every single table.resultIDsResultNamesProbs
    // next, iterate through that array, and if any id matches this.id, don't delete
    try {
        const allTables = await Table.find();
        for (let i = 0; i < allTables.length; i++) {
            for (let i = 0; i < allTables[i].resultIDsResultNamesProbs.length; i++) {
                if (allTables[i].resultIDsResultNamesProbs[i][0] === this.id) {
                    throw `Cannot delete an Outcome that is part of a Table.`;
                };
            }
        };
        next();
    } catch (e) {
        next(e);
    };

    // Table.find({ resultIDsResultNamesProbs: /*containing*/ this.id }, (err, tables) => {
    //     if (err) {
    //         next(err);
    //     } else if (tables.length > 0) {
    //         next(new Error(`Cannot delete Outcome that is part of a table.`));
    //     } else {
    //         next();
    //     };
    // });
});

module.exports = mongoose.model(`Outcome`, outcomeSchema);