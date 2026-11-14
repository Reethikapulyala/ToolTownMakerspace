
const express = require("express");
const router = express.Router();

const {
    getAllMakers,
    getMakerById
} = require("../controllers/makerController");

router.get("/", getAllMakers);

router.get("/:id", getMakerById);

module.exports = router;
