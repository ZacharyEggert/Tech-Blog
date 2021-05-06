
const handleError = (req, res, err) => {
    console.error(err);
    res.status(500).json(err)
}

module.exports = handleError