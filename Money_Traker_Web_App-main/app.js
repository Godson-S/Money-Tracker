const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.use(express.json());

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDB();

// Define MongoDB collection
const collection = client.db('money-tracker-DB').collection('expenses');

// Add Expense
app.post('/expenses', async (req, res) => {
    const expense = req.body;
    try {
        await collection.insertOne(expense);
        res.status(201).send('Expense added successfully');
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).send('Internal server error');
    }
});

// Get All Expenses
app.get('/expenses', async (req, res) => {
    try {
        const expenses = await collection.find().toArray();
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
