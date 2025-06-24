const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Модел за MongoDB

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Проверка дали веќе постои корисник со таа е-пошта
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Веќе постои корисник со таа е-пошта' });
    }

    // Креирање нов корисник
    const newUser = new User({ name, email, password, role: role || 'user' });
    await newUser.save();

    res.status(201).json({ message: 'Успешна регистрација' });
  } catch (err) {
    console.error('❌ Грешка при регистрација:', err);
    res.status(500).json({ message: 'Грешка при регистрација' });
  }
});

module.exports = router;

