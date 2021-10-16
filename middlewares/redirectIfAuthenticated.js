module.exports = (req, res, next) => {
  if (req.user) {
    res.redirect("/home");
  } else {
    next();
  }
};
