const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const User = require('../module/users/entity/model'); // Adjust the path if needed

// Serialize the user to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.redirectUri, // The redirect URI after authentication
    },
    async (token, tokenSecret, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        // If the user doesn't exist, create a new one
        if (!user) {
          user = new User({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
          });
          await user.save();
        }

        // Return the user object
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
