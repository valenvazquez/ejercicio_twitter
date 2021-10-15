const { User, Tweet } = require("../models");

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  console.log();
  try {
    const content = req.body.content;
    const tweet = new Tweet({
      content,
      user: req.user,
    });
    await tweet.save();
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    // res.render("home", { errors: error.errors, user: req.user });
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
