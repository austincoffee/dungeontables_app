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
    assocTables: { // not sure if this should be here, because if the table deletes the outcome, then this won't change
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

    // old
    try {
        const allTables = await Table.find();
        for (let i = 0; i < allTables.length; i++) {
            for (let j = 0; j < allTables[i].resultIDsResultNamesProbs.length; j++) {
                if (allTables[i].resultIDsResultNamesProbs[j][0] === this.id) {
                    throw `Cannot delete an Outcome that is part of a Table.`;
                };
            };
        };
        next();
    } catch (e) {
        next(e);
    };
});

module.exports = mongoose.model(`Outcome`, outcomeSchema);