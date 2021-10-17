const { Tweet } = require("../models");

// Store a newly created resource in storage.
async function store(req, res) {
  const tweet = await Tweet.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.user.id } },
    { new: true },
  );
  res.json(tweet);
}
// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const tweet = await Tweet.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user.id } },
      { new: true },
    );
    res.json(tweet);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  store,
  destroy,
};
