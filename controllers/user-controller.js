const { User } = require('../models');

const userController = {
    // create user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // delete user
    delteUser({ params }, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // get all user
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // get user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
        .populate({ 
            path: 'thoughts',
            select: '-__v'
        })
        .populate({ 
            path: 'friends',
            select: '-__v'
        })
        .then (dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    // update user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId },
            { $push: { friends: params.freindId}},
            { new: true}
        )
        .then((dbUserData) => {
            if (dbUserData) {
                res.status(404).json({ message: 'No User found with Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // delete friend
    delteFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId },
            { $push: { friends: params.freindId}},
            { new: true}
        )
        .then((dbUserData) => {
            if (dbUserData) {
                res.status(404).json({ message: 'No User found with Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    }
};

module.exports = userController;