const { Tweet } = require("../models");

// Store a newly created resource in storage.
async function store(req, res) {
  const tweet = await Tweet.findByIdAndUpdate(req.params.id, { $push: { likes: req.user } });
  res.redirect("/home");
}
// Remove the specified resource from storage.
async function destroy(req, res) {
  const tweet = await Tweet.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user } });
  res.redirect("/home");
}

module.exports = {
  store,
  destroy,
};
