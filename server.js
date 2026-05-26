const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');  // Add this line
const app = express();
const port = 3001;  // Ensure this line is correct

app.use(cors());  // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let webhookUrl = '';

// Endpoint to set the webhook URL
app.post('/set-webhook', (req, res) => {
    webhookUrl = req.body.webhookId;
    console.log('Webhook URL set:', webhookUrl);
    res.status(200).send('Webhook ID set');
});

// Endpoint to capture and send the PNG link
app.post('/capture', (req, res) => {
    const { pngLink } = req.body;
    if (!webhookUrl) {
        return res.status(400).send('Webhook ID not set');
    }

    const data = {
        content: `PNG Link: ${pngLink}`
    };

    request.post(webhookUrl, { json: data }, (error, response, body) => {
        if (error) {
            console.error('Error sending to Discord:', error);
            res.status(500).send('Error sending to Discord');
        } else {
            console.log('Data sent to Discord:', body);
            res.status(200).send('Data captured and sent to Discord');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
