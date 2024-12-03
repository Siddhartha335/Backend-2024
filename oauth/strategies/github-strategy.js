import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8800/api/user/github/redirect",
      scope: ["user:email"],  // Scope to get user email and basic profile information
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile); // You can log the user profile for debugging
      return done(null, profile); // Pass the user profile to the next step (session or database)
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);  // Optionally fetch from database if needed
  });
  
