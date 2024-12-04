const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//get All users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Register a new user
router.post('/', async (req, res) =>{
    const userInfo = new User(req.body);

    try {
        const newUser = await userInfo.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// User log in
router.post('/login', async (req, res) => {
    try{
        // Get email and Password from login fields
        const{email, password} = req.body;

        // Find existing user with given email
        const user = await User.findOne({email});
        if(!user) { 
            return res.status(400).json({message: "Invalid email or password"});
        }

        // Compare found users password with encrypted password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        // Generate JWT
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SCERET,
            {expiresIn: '1h'}
        );

        res.json({ token, user:{ id: user._id, name: user.name, email: user.email} });
    } catch(err) {
        res.status(500).json({ message: 'Server error'});
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