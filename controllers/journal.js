const { Journal } = require("../db/models/journal")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addJournal = promise(async (req, res) => {
    const body = req.body

    const newJournal = new Journal({
        userId: req.user._id,
        ...body,
    })
    await newJournal.save()
    res.status(200).json({ message: "Successfully added journal" })
})

exports.getAllJournals = promise(async (req, res) => {
    const journal = await Journal.find({ userId: req.user._id })
    if (!journal) throw new Exceptions.NotFound("No journal found")

    res.status(200).json({ journal })
})

exports.getSingleJournal = promise(async (req, res) => {
    const body = req.body

    const journal = await Journal.findById(body.journalId)
    if (!journal) throw new Exceptions.NotFound("No journal found")

    res.status(200).json({ journal })
})