
const db = require("../db");

// GET all tools
const getAllTools = (request, response) => {

    db.all("SELECT * FROM tools", [], (error, rows) => {

        if (error) {
            return response.status(500).json({
                message: error.message
            });
        }

        response.status(200).json(rows);
    });
};

// GET one tool
const getToolById = (request, response) => {

    const { id } = request.params;

    db.get(
        "SELECT * FROM tools WHERE tool_id = ?",
        [id],
        (error, row) => {

            if (error) {
                return response.status(500).json({
                    message: error.message
                });
            }

            if (!row) {
                return response.status(404).json({
                    message: "Tool not found"
                });
            }

            response.status(200).json(row);
        }
    );
};

// ADD tool
const addTool = (request, response) => {

    const { name, kind } = request.body;

    db.run(
        "INSERT INTO tools (name, kind) VALUES (?, ?)",
        [name.trim(), kind],
        function (error) {

            if (error) {
                return response.status(500).json({
                    message: error.message
                });
            }

            response.status(201).json({
                message: "Tool added successfully",
                toolId: this.lastID
            });
        }
    );
};

// UPDATE tool
const updateTool = (request, response) => {

    const { id } = request.params;
    const { name, kind } = request.body;

    db.run(
        `UPDATE tools
         SET name = ?, kind = ?
         WHERE tool_id = ?`,
        [name.trim(), kind, id],
        function (error) {

            if (error) {
                return response.status(500).json({
                    message: error.message
                });
            }

            if (this.changes === 0) {
                return response.status(404).json({
                    message: "Tool not found"
                });
            }

            response.status(200).json({
                message: "Tool updated successfully"
            });
        }
    );
};

// DELETE tool
const deleteTool = (request, response) => {

    const { id } = request.params;

    db.run(
        "DELETE FROM tools WHERE tool_id = ?",
        [id],
        function (error) {

            if (error) {
                return response.status(500).json({
                    message: error.message
                });
            }

            if (this.changes === 0) {
                return response.status(404).json({
                    message: "Tool not found"
                });
            }

            response.status(200).json({
                message: "Tool deleted successfully"
            });
        }
    );
};

// SEARCH tools by kind
const searchTools = (request, response) => {

    const { kind } = request.query;

    if (!kind) {
        return response.status(400).json({
            message: "Kind query parameter is required"
        });
    }

    db.all(
        "SELECT * FROM tools WHERE kind = ?",
        [kind],
        (error, rows) => {

            if (error) {
                return response.status(500).json({
                    message: error.message
                });
            }

            response.status(200).json(rows);
        }
    );
};

module.exports = {
    getAllTools,
    getToolById,
    addTool,
    updateTool,
    deleteTool,
    searchTools
};
