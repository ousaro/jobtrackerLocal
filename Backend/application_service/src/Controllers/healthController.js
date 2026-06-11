exports.healthCheck = (req, res) => {
  try {
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
