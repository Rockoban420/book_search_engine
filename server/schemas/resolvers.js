const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { userID }) => {
            return User.findOne({ _id: userID });
        },
        users: async (parent) => {
            return User.find();
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new AuthenticationError('Something is wrong!');
            }
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ $or: [{ username: email }, { email: email }] });
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { userID, authors, description, bookId, image, link, title }) => {
            return User.findOneAndUpdate(
                { _id: userID },
                { $addToSet: { savedBooks: { authors, description, bookId, image, link, title } } },
                { new: true, runValidators: true }
            );
        },
        removeBook: async (parent, { userID, bookId }) => {
            return User.findOneAndUpdate(
                { _id: userID },
                { $pull: { savedBooks: { bookId } } },
                { new: true, runValidators: true }
            );
        }
    }
};

module.exports = resolvers;
