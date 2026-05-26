const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const webhookUrl = 'https://discordapp.com/api/webhooks/1508814909008515094/K6_XrOoEL_GXG1UJ2Rf9KI_1b76AgKZ7lAM_Nt-WSZkW8mjKxzCCFxavsTiG4ylQyPGL';

app.post('/start', (req, res) => {
    const data = {
        content: 'Script started.'
    };
    request.post(webhookUrl, { json: data }, (error, response, body) => {
        if (error) {
            console.error('Error sending to Discord:', error);
            res.status(500).send('Error sending to Discord');
        } else {
            console.log('Script started message sent to Discord:', body);
            res.status(200).send('Script started');
        }
    });
});

app.post('/capture', (req, res) => {
    const { pngLink } = req.body;
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
    console.log(`Server running at http://localhost:${port}`);
});
