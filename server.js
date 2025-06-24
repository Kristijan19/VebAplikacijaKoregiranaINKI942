const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // ← овде

dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Рути
app.use('/api/auth', authRoutes);

// Поврзување со MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/boutique', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Поврзан со MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Сервер стартуван на http://localhost:${PORT}`);
  });
}).catch(err => console.error('❌ Mongo грешка:', err));


