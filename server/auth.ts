import mongoose, { Schema, Document } from 'mongoose';
import { Passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
const crypto = require('crypto');

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      bio: string;
    }
  }
}

export interface DBUser extends Document {
  username: string;
  hashed_password: Buffer;
  salt: Buffer;
  bio: string;
}
const userSchema = new Schema<DBUser>({
  username: { type: String, required: true },
  hashed_password: { type: Buffer, required: true },
  salt: { type: Buffer, required: true },
  bio: { type: String, required: false }
});
export const UserModel = mongoose.model<DBUser>('User', userSchema);


const passportInstance = new Passport();
passportInstance.use('local', new LocalStrategy((username, password, done) => {
  UserModel.findOne({ username }).then((user) => {
    if (user) {
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (err: any, hashedPassword: string) => {
        if (err) { return done(err); }
        if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
          return done(null, false, { message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        return done(null, { id: user.id, username: user.username, bio: user.bio });
      });
    } else {
      return done(null, false, { message: "Nom d'utilisateur ou mot de passe incorrect" });
    }
  })
    .catch((err) => done(err));

}));

passportInstance.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
    UserModel.findOne({ username }).then((user) => {
      if (user) {
        return done(null, false, { message: "Un utilisateur avec le même nom existe déjà" });
      } else {
        // create the user
        var newUser = new UserModel();

        // set the user's local credentials
        newUser.username = username;
        newUser.bio = req.body.bio;
        newUser.salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, newUser.salt, 310000, 32, 'sha256', (err: any, hashedPassword: string) => {
          newUser.hashed_password = Buffer.from(hashedPassword);

          // save the user
          newUser.save().then((value) => {
            const returnUser: Express.User = { id: value._id, username: value.username, bio: value.bio };
            return done(null, returnUser);
          });
        })
      }

    })
      .catch((err) => done(err));
  }));


passportInstance.serializeUser((user: Express.User, done) => {
  process.nextTick(() => {
    done(null, user);
  });
});

passportInstance.deserializeUser((user: Express.User, done) => {
  UserModel.findById(user.id).then((user: any) => {
    return done(null, user);
  })
    .catch(err => done(err));
});

export default passportInstance;

