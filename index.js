const express = require('express');
const app = express();
const PORT = 8000;

// Middleware to parse JSON data
app.use(express.json());

// POST endpoint to calculate total product value
app.post('/api/total-value', (req, res) => {
    const products = req.body;

    // Validate input
    if (!Array.isArray(products)) {
        return res.status(400).json({ error: "Input should be an array of products" });
    }

    // Calculate total value
    let totalValue = products.reduce((acc, product) => {
        const { price, quantity } = product;

        // Ensure price and quantity are numbers and valid
        if (typeof price !== 'number' || typeof quantity !== 'number') {
            return res.status(400).json({ error: "Each product should have numeric price and quantity" });
        }

        return acc + (price * quantity);
    }, 0);

    // Return the total value
    res.json({ totalValue });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
