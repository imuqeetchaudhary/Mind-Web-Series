const express = require("express")
const router = express.Router()
const journal = require("../controllers/journal")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addJournalSchema, getSingleJournalSchema } = require("../validation/journal")

router
    .post("/add", authentication, validation(addJournalSchema), journal.addJournal)
    .get("/get-all", authentication, journal.getAllJournals)
    .post("/get-single", authentication, validation(getSingleJournalSchema), journal.getSingleJournal)

module.exports = router