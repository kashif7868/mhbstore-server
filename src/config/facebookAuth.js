const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');
const User = require('../module/users/entity/model');

// Configure Passport to use Facebook strategy
passport.use(new FacebookStrategy(
  {
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackUrl,
    profileFields: ['id', 'emails', 'name', 'picture'], // Fields to fetch
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      // Check if user exists in the database
      let user = await User.findOne({ facebookId: profile.id });

      if (!user) {
        // If user does not exist, create a new user
        user = new User({
          facebookId: profile.id,
          email: profile.emails[0].value,
          fullName: profile.name.givenName + ' ' + profile.name.familyName,
          photoPath: profile.photos[0].value,
        });
        await user.save();
      }

      return done(null, user); // Successful authentication
    } catch (error) {
      console.error('Facebook authentication error:', error);
      return done(error, null); // Handle error
    }
  }
));
