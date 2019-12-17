const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./../database/models/user_model");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

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

passport.use(new LocalStrategy({
        usernameField: "email"
    }, 
    async (email, password, done) => {
        const user = await UserModel.findOne({ email })
            .catch(done);

        if (!user || !user.verifyPasswordSync(password)) {
            return done(null, false);
        }

        return done(null, user);
    }
));

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, 
    async (jwtPayload, done) => {
        const user = await UserModel.findById(jwtPayload.sub)
            .catch(done);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    }
))

module.exports = passport;