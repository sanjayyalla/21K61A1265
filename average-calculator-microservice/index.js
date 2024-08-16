const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;

const WINDOW_SIZE = 10;
let numbersWindow = [];

app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type;
    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    let apiUrl;
    switch (type) {
        case 'p':
            apiUrl = 'http://20.244.56.144/test/primes';
            break;
        case 'f':
            apiUrl = 'http://20.244.56.144/test/fibo';
            break;
        case 'e':
            apiUrl = 'http://20.244.56.144/test/even';
            break;
        case 'r':
            apiUrl = 'http://20.244.56.144/test/rand';
            break;
    }

    try {
        const response = await axios.get(apiUrl);
        const numbers = response.data.numbers;

        // Update the window with new numbers
        numbersWindow = [...numbersWindow, ...numbers];
        if (numbersWindow.length > WINDOW_SIZE) {
            numbersWindow = numbersWindow.slice(-WINDOW_SIZE);
        }

        const avg = numbersWindow.length ? (numbersWindow.reduce((sum, num) => sum + num, 0) / numbersWindow.length).toFixed(2) : 0;

        res.json({
            windowPrevState: numbersWindow.slice(0, -numbers.length),
            windowCurrState: numbersWindow,
            numbers,
            avg
        });
    } catch (error) {
        console.error('Error fetching numbers:', error.message);
        res.status(500).json({ error: 'Error fetching numbers' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
