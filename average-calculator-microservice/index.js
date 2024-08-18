const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;

const WINDOW_SIZE = 10;
let numbersWindow = [];
const AUTH_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzNzg5OTUxLCJpYXQiOjE3MjM3ODk2NTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA5Y2YzOGVhLTM4OTktNGE2My1hMGU5LWZmOTY3ZTA1ZTgwMSIsInN1YiI6InNhbmpheS55YWxsYUBzYXNpLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiU2FzaSBJbnN0aXR1dGUgT2YgVGVjaG5vbG9neSBcdTAwMjYgRW5naW5lZXJpbmciLCJjbGllbnRJRCI6IjA5Y2YzOGVhLTM4OTktNGE2My1hMGU5LWZmOTY3ZTA1ZTgwMSIsImNsaWVudFNlY3JldCI6IkZPT2ZQTElFSlRhbXRNa2UiLCJvd25lck5hbWUiOiJTYW5qYXkgWWFsbGEiLCJvd25lckVtYWlsIjoic2FuamF5LnlhbGxhQHNhc2kuYWMuaW4iLCJyb2xsTm8iOiIyMUs2MUExMjY1In0.0tpQu8hJKBMrk-Z3S9OWGCJxbbD4vKS-IQOK6LB7xy8';

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
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${AUTH_KEY}`
            }
        });
       
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
