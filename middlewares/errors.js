const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorhandler = (err, req, res, next) => {
  console.log(res.statusCode);
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(statuscode);
  res.status(statuscode).json({ message: err.message });
};
module.exports = {
  notFound,
  errorhandler,
};
