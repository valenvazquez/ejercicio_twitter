$("#textSignIn").click(function (e) {
  e.preventDefault();
  $("#registerPage").addClass("d-none");
  $("#registerPage").removeClass("d-flex");
  $("#loginpage").addClass("d-flex");
  $("#loginpage").removeClass("d-none");
});

$("#textSignUp").click(function (e) {
  e.preventDefault();
  $("#loginpage").addClass("d-none");
  $("#loginpage").removeClass("d-flex");
  $("#registerPage").addClass("d-flex");
  $("#registerPage").addClass("flex-column");
  $("#registerPage").addClass("justify-content-center");
  $("#registerPage").removeClass("d-none");
});
