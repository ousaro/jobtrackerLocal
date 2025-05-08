
exports.healthCheck = (req, res) => {
    try {
        res.status(200).json({ message: "User Service is running!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}