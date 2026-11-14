
const db = require("./db");

db.serialize(() => {

    // Display makers
    db.all("SELECT * FROM makers", (error, rows) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log("\n===== MAKERS =====");
            console.table(rows);
        }
    });

    // Display tools
    db.all("SELECT * FROM tools", (error, rows) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log("\n===== TOOLS =====");
            console.table(rows);
        }
    });

    // Display loans
    db.all("SELECT * FROM loans", (error, rows) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log("\n===== LOANS =====");
            console.table(rows);
        }
    });

    // JOIN makers and tools
    db.all(`
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
    `, (error, rows) => {

        if (error) {
            console.log(error.message);
        } else {
            console.log("\n===== JOIN RESULTS =====");
            console.table(rows);
        }

        db.close();
    });
});
