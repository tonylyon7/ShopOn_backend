const errorHandler = (err, req, res, next) => {
  switch (true) {
    case typeof err === "string":
      // custom application error
      const is404 = err.toLowerCase().endsWith("not found")
      const statuscode = is404 ? 404 : 400
      return res.status(statuscode).json({message: err})
    case err.name === "ValidationError":
      // mongoose validation error
      return res.status(400).json({
        message: err.message,
      })
    case err.name === "Unauthorized":
      // jwt authentication error
      return res.status(401).json({
        message: "Unauthorized",
      })
    default:
      return res.status(500).json({message: err.message})
  }
}

export {errorHandler}
