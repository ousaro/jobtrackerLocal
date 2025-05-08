exports.healthCheck = (req, res) => {
    try {
        res.status(200).json({ status: 'Search server is up and running!' }); 
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
}