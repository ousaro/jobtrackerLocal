
const checkHealth = async  (req, res) => {
    res.status(200).json({ status: 'UP' });
}

module.exports = {
    checkHealth
};
