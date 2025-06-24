const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('Веќе постои корисник со таа е-пошта');

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.redirect('/login'); // или испрати success response
  } catch (err) {
    console.error(err);
    res.status(500).send('Грешка при регистрација');
  }
});

module.exports = router;

