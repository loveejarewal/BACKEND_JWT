Firstly Install The Dependencies

# npm init
# npm i express dotenv mongoose colors
# npm i -D nodemon
# npm i express-async-handler
# npm i bcryptjs
# npm i jsonwebtoken

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const secretKey = 'yourSecretKey'; // Replace this with a secure secret key in production.

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.use(cors());
app.use(bodyParser.json());

// User registration API
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
});

// User login API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
