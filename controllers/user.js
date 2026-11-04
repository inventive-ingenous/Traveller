const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Successfully signed up!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Successfully logged in!");
  res.redirect(req.session.redirectUrl || "/listings");
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/listings");
    }
    req.flash("success", "Successfully logged out!");
    res.redirect("/listings");
  });
}
