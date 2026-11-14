
const express = require("express");
const router = express.Router();

const validateTool = require("../middleware/validateTool");

const {
    getAllTools,
    getToolById,
    addTool,
    updateTool,
    deleteTool,
    searchTools
} = require("../controllers/toolController");

// Search tools
router.get("/search", searchTools);

// Get all tools
router.get("/", getAllTools);

// Get tool by ID
router.get("/:id", getToolById);

// Add tool
router.post("/", validateTool, addTool);

// Update tool
router.put("/:id", validateTool, updateTool);

// Delete tool
router.delete("/:id", deleteTool);

module.exports = router;
