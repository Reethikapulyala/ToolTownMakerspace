
const db = require("./db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS makers (
            maker_id INTEGER PRIMARY KEY AUTOINCREMENT,
            maker_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS tools (
            tool_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            kind TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Available'
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS loans (
            loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
            maker_id INTEGER NOT NULL,
            tool_id INTEGER NOT NULL,
            loan_date TEXT NOT NULL,
            return_date TEXT,
            status TEXT DEFAULT 'Borrowed',
            FOREIGN KEY (maker_id) REFERENCES makers(maker_id),
            FOREIGN KEY (tool_id) REFERENCES tools(tool_id)
        )
    `);

    db.run(`
        INSERT OR IGNORE INTO makers
        (maker_id, maker_name, email)
        VALUES
        (1, 'Rahul', 'rahul@gmail.com'),
        (2, 'Priya', 'priya@gmail.com'),
        (3, 'Arjun', 'arjun@gmail.com')
    `);

    db.run(`
        INSERT OR IGNORE INTO tools
        (tool_id, name, kind, status)
        VALUES
        (1, 'Electric Drill', 'Power', 'Available'),
        (2, 'Hammer', 'Hand', 'Available'),
        (3, 'Measuring Tape', 'Measuring', 'Available'),
        (4, 'Circular Saw', 'Power', 'Available')
    `);

    db.run(`
        INSERT OR IGNORE INTO loans
        (loan_id, maker_id, tool_id, loan_date, return_date, status)
        VALUES
        (1, 1, 1, '2026-11-10', NULL, 'Borrowed'),
        (2, 2, 2, '2026-11-11', '2026-11-12', 'Returned'),
        (3, 3, 3, '2026-11-12', NULL, 'Borrowed')
    `, (error) => {

        if (error) {
            console.log("Database setup error:", error.message);
        } else {
            console.log("Makers table created");
            console.log("Tools table created");
            console.log("Loans table created");
            console.log("Sample data inserted");
        }

        db.close();
    });
});
