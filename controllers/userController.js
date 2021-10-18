const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  try {
    const users = await User.find().limit(3);
    const user = await User.findOne({ username: req.params.username }).populate({
      path: "tweets",
      populate: {
        path: "user",
      },
    });
    if (user) {
      res.render("profilePage", { thisUser: user, users });
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error);
  }
}

// Show the form for creating a new resource
async function store(req, res) {
  try {
    const user = await User.create(req.body);
    req.login(user, () => res.redirect("/home"));
  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  //tiene que tener el mimso nombre firstname_edit en el form
  const id = req.body.id_editar;
  const firstname = req.body.name_edit;
  const lastname = req.body.lastname_edit;
  Alumno.findByIdAndUpdate(id, { firstname, lastname }, (error, user) => {
    if (error) {
      return res.status(500).json({
        message: "error al actualizar",
      });
    }
    res.redirect("/");
  });
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const id = req.params.id;
  User.findByIdAndRemove(id, (error, User) => {
    if (error) {
      return res.status(500).json({
        message: "error al borrar",
      });
    }
    res.redirect("/");
  });
}

async function follow(req, res) {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $push: { followers: req.user.id } },
    { new: true },
  );
  req.user.following.push(user._id);
  await req.user.save();
  res.json({ user: req.user, followed_user: user });
}

async function unfollow(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followers: req.user._id } },
      { new: true },
    );
    await User.findByIdAndUpdate(req.user.id, { $pull: { following: user._id } });
    res.json({ unfollowed_user: user });
  } catch (error) {
    console.log(error);
  }
}

// Otros handlers...
// ...

module.exports = {
  show,
  store,
  update,
  destroy,
  follow,
  unfollow,
};
