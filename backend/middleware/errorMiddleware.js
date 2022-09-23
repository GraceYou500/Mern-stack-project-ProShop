const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.log('not found trigger');
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log('error Handler trigger', res.statusCode);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
