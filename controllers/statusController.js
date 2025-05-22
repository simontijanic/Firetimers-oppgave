exports.getStatus = (req, res) => {
    const status = {
        status: "OK",
        message: "API is running smoothly",
        timestamp: new Date().toISOString()
    };
    res.status(200).json(status);
}