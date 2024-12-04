const express = require('express');
const router = express.Router();
const User = require('../models/User');

//get All users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// POST a new user
router.post('/', async (req, res) =>{
    const userInfo = new User(req.body);

    try {
        const newUser = await userInfo.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//get a user by userID
router.get('/:id', async (req, res) => {
    try{
        console.log(req.params.id)
        const foundUser = await User.findById(req.params.id); // search for user

        if(!foundUser) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json(foundUser); // return user
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


//export router
module.exports = router;