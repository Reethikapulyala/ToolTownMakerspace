
const allowedKinds = ["Power", "Hand", "Measuring"];

const validateTool = (request, response, next) => {

    const { name, kind } = request.body;

    if (!name || typeof name !== "string" || !name.trim()) {
        return response.status(400).json({
            message: "Tool name is required"
        });
    }

    if (!allowedKinds.includes(kind)) {
        return response.status(400).json({
            message: "Invalid tool kind",
            allowedValues: allowedKinds
        });
    }

    next();
};

module.exports = validateTool;
