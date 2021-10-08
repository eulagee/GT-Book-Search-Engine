const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me : async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id:contex.user.id })
          return userData;
        }
      

      
    }
    

  },
  Mutation: {
   login: async (parent, { email, password, username }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (user) {
          const correctPw = await user.isCorrectPassword(password);
          if (correctPw) return signToken(user);
      }
    },
    addUser: async (parent, { email, password, username }) => {
      const user = await User.create({email, password, username});
      if (user) {
          return signToken(user);
      }
    },
    saveBook: async (parent, { authors, bookId, description, link, image, title }, context) => {
     const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: {authors, bookId, description, link, image, tittle} } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    removeBook: async (parent, {bookId }, context) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
        );
        return updatedUser;

    }
  }
};

module.exports = resolvers;