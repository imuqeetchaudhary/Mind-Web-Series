const yup = require("yup")

exports.addJournalSchema = yup.object({
    journalTitle: yup.string().required(),
    journalDescription: yup.string().required(),
    entryDate: yup.date().required()
})

exports.getSingleJournalSchema = yup.object({
    journalId: yup.string().required()
})