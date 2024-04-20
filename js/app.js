const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Car', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err);
});

// Load Car Rental model
const CarRental = require('./models/CarRental');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set view engine
app.set('view engine', 'ejs');

// Route for rendering the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route for handling form submission
app.post('/search', (req, res) => {
    const { pickupLocation, dropLocation, pickupDate, returnDate } = req.body;

    // Here, you would query MongoDB based on the form input data
    // For now, let's assume we have a CarRental model and we fetch data
    // Example query:
    CarRental.find({ pickup_location: pickupLocation, drop_location: dropLocation, pickup_date: pickupDate, return_date: returnDate })
        .then((rentals) => {
            res.render('search_results', { rentals });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
