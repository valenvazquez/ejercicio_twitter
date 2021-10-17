const { User, Tweet } = require("../models");

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const content = req.body.content;
    const tweet = new Tweet({
      content,
      user: req.user,
    });
    await tweet.save();
    res.json(tweet);
  } catch (error) {
    console.log(error);
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  show,
  store,
  destroy,
};
