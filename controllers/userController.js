const User = require("../models/user");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

async function signup(req, res) {
  res.render("pages/login", {
    title: "Sign up",
    user: new User(),
  });
}

async function signin(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  user
    .save()
    .catch((error) => {
      return res.render("landing", { errors: error.errors, user: user });
    })
    .then(() => {
      return req.login(user);
    })
    .then(() => {
      return res.redirect("/");
    })
    .catch((error) => {
      return next(error);
    });
}

// Store a newly created resource in storage.
async function store(req, res) {}

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

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  signup,
  signin,
};
