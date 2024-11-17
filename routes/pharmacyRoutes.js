const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy'); // Import the Pharmacy model

// Get all pharmacies
router.get('/', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific pharmacy by ID
router.get('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id); // Find pharmacy by ID
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' }); // Return 404 if not found
    }
    res.json(pharmacy); // Return the pharmacy details
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle any other errors
  }
});

// Add a new pharmacy
router.post('/', async (req, res) => {
  const pharmacy = new Pharmacy({
    name: req.body.name,
    location: req.body.location,
    rating: req.body.rating,
  });

  try {
    const newPharmacy = await pharmacy.save();
    res.status(201).json(newPharmacy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
