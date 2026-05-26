const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 3001;  // Change this line

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let webhookUrl = '';

app.post('/set-webhook', (req, res) => {
    webhookUrl = req.body.webhookId;
    res.status(200).send('Webhook ID set');
});

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);  // Change this line
});
