const { User, Tweet } = require("../models");

// Display the specified resource.
async function show(req, res) {
  const users = await User.find().limit(3);
  const tweet = await Tweet.findById(req.params.tweetId).populate("user");
  res.render("tweetPage", { tweet, users });
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const tweet = await Tweet.create({
      content: req.body.content,
      user: req.user,
    });
    req.user.tweets.push(tweet._id);
    await req.user.save();
    res.json(tweet);
  } catch (error) {
    console.log(error);
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  console.log(req.params.tweetId);
  const tweet = await Tweet.findById(req.params.tweetId);
  if (String(tweet.user._id) === String(req.user.id)) {
    tweet.remove();
    res.redirect("/" + req.params.username);
  } else {
    res.redirect("/home");
  }
}

// Otros handlers...
// ...

module.exports = {
  show,
  store,
  destroy,
};
