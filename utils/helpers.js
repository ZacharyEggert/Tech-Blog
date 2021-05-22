const formatTimestamp = (tstamp) => {
    return new Date(tstamp).toLocaleString();
};

module.exports = { formatTimestamp };
