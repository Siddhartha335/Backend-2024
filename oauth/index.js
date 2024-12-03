import express from "express";
import passport from "passport";
import session from "express-session";
import "./strategies/github-strategy.js"; // Import the GitHub strategy

const app = express();
app.use(
    session({
      secret: process.env.SECRET_KEY, // Replace with a strong secret
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Use true for https
    })
  );

// Body parser middleware
app.use(express.json());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// GitHub authentication route
app.get(
  "/api/user/github",
  passport.authenticate("github", { scope: ["user:email"] }) // GitHub login with scopes
);

// Callback route after GitHub redirects the user
app.get(
  "/api/user/github/redirect",
  passport.authenticate("github", { failureRedirect: "/" }), // Redirect on failure
  (req, res) => {
    // If successful, GitHub will redirect here with the profile info
    res.status(200).json({ message: "Successfully authenticated with GitHub", user: req.user.username });
  }
);

app.listen(8800, () => {
  console.log("Server started on port 8800");
});
