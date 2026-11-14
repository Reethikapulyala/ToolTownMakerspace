
const express = require("express");
const router = express.Router();

const {
    getAllLoans
} = require("../controllers/loanController");

router.get("/", getAllLoans);

module.exports = router;
