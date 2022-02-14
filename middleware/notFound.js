const notFound = (req, res) => {
  res.status(404).send("The page is not found");
};

module.exports = notFound;
