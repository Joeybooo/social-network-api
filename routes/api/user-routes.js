const router = require('express').Router();

const {
    createUser,
    delteUser,
    getAllUser,
    getUserById,
    updateUser,
    addFriend,
    delteFriend
} = require('../../controllers/user-controller');

router  
    .route('/')
    .get(getAllUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(delteUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(delteFriend);

module.exports = router;