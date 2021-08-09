const mongoose = require("mongoose")
const schema = mongoose.Schema

const journalSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        required: true
    },
    journalTitle: {
        type: String,
        require: true
    },
    journalDescription: {
        type: String,
        require: true
    },
    entryDate: {
        type: Date,
        require: true
    }
})

exports.Journal = mongoose.model("Journal", journalSchema)