exports.healthCheck = async (req, res) =>{
    try {

        res.status(200).json({ status: 'OK', message: 'Service is healthy' });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({ status: 'ERROR', message: 'Service is not healthy' });
    }
}