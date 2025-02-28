require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({ origin: ['http://localhost:3000', 'https://heritagetriage.com'], methods: ['POST'] }));
app.use(express.json());

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('heritagetriage'); // Return the database instance
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if connection fails
  }
}

app.post('/api/contact', async (req, res) => {
  try {
    const db = await connectDB();
    const contactForm = db.collection('contacts');

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const result = await contactForm.insertOne({ name, email, message, createdAt: new Date() });

    res.json({ success: true, message: 'Message sent successfully!', id: result.insertedId });
    
  } catch (error) {
    console.error('Error inserting document:', error);
    res.status(500).json({ success: false, message: 'Error sending message.' });
  }
});

app.listen(port, () => {
  console.log(`API endpoint listening at http://localhost:${port}`);
});
