
const express = require("express");

const app = express();

app.use(express.json());

// Import routes
const toolRoutes = require("./routes/toolRoutes");
const makerRoutes = require("./routes/makerRoutes");
const loanRoutes = require("./routes/loanRoutes");

// Home route
app.get("/", (request, response) => {
    response.send("Welcome to ToolTown Makerspace API");
});

// Tool routes
app.use("/tools", toolRoutes);

// Maker routes
app.use("/makers", makerRoutes);

// Loan routes
app.use("/loans", loanRoutes);

// Invalid route
app.use((request, response) => {
    response.status(404).json({
        message: "Route not found"
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});

module.exports = app;
