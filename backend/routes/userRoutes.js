const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

//get All medications
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(medications);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

