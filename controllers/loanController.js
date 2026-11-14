
const db = require("../db");

// GET all loans with maker and tool names
const getAllLoans = (request, response) => {

    const query = `
        SELECT
            loans.loan_id,
            makers.maker_name,
            tools.name AS tool_name,
            loans.loan_date,
            loans.return_date,
            loans.status
        FROM loans
        INNER JOIN makers
            ON loans.maker_id = makers.maker_id
        INNER JOIN tools
            ON loans.tool_id = tools.tool_id
    `;

    db.all(query, [], (error, rows) => {

        if (error) {
            return response.status(500).json({
                message: error.message
            });
        }

        response.status(200).json(rows);
    });
};

module.exports = {
    getAllLoans
};
