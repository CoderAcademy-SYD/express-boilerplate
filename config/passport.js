const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./../database/models/user_model");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch(error) {
        done(error);
    }
});

passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    async (email, password, done) => {
        try{
            const user = await UserModel.findOne({ email });

            if (!user || !user.verifyPasswordSync(password)) {
                return done(null, false);
            }

            return done(null, user);

        } catch(error) {
            done(error);
        }
    }
));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: (req) => {
            if (req && req.cookies) {
                return req.cookies["jwt"];
            }

            return null;
        },
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwtPayload, done) => {
        try{
            const user = await UserModel.findById(jwtPayload.sub);

            if (!user) {
                return done(null, false);
            }

            return done(null, user);

        } catch(error) {
            done(error);
        }
    }
));

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_REDIRECT
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        if (profile.emails && profile.emails.length > 0) {
            try {
                const user = await UserModel.findOne({ email: profile.emails[0].value });

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    }
));