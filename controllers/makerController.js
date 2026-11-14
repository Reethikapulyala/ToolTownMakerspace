
const db = require("../db");

// GET all makers
const getAllMakers = (request, response) => {

    db.all("SELECT * FROM makers", [], (error, rows) => {

        if (error) {
            return response.status(500).json({
                message: error.message
            });
        }

        response.status(200).json(rows);
    });
};

// GET one maker
const getMakerById = (request, response) => {

    const { id } = request.params;

    db.get(
        "SELECT * FROM makers WHERE maker_id = ?",
        [id],
        (error, row) => {

            if (error) {
                return response.status(500).json({
                    message: error.message
                });
            }

            if (!row) {
                return response.status(404).json({
                    message: "Maker not found"
                });
            }

            response.status(200).json(row);
        }
    );
};

module.exports = {
    getAllMakers,
    getMakerById
};
