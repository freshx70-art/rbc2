const fetch = require('node-fetch');

const startScript = async () => {
    try {
        const response = await fetch('http://localhost:3001/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log('Script started');
            const pngLink = prompt('Enter the PNG image address:');
            const captureResponse = await fetch('http://localhost:3001/capture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pngLink })
            });
            if (captureResponse.ok) {
                console.log('Data captured and sent to Discord');
            } else {
                console.error('Failed to capture and send data');
            }
        } else {
            console.error('Failed to start script');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

startScript();
