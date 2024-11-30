const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('mongo-db connected'))
.catch(err => console.log(err));

const Medication = require('./models/Medication');
const Pharmacy = require('./models/Pharmacy');
const User = require('./models/User');

app.get('/', (req, res) => {
    res.send('welcome to pharma-see API');
});

app.listen(PORT, () => {
    console.log('server running on port ${PORT}');
})