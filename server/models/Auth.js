const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
import

const authSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: User,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);



const Auth = model('Auth', authSchema);

module.exports = Auth;
