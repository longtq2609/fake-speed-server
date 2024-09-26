const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 2609 });

let x = 0;

wss.on('connection', (ws) => {
    console.log('New connection established');
    console.log(`Total clients connected: ${wss.clients.size}`);

    ws.on('message', (message) => {
        x = parseInt(message);
        console.log(`Updated x to: ${x}`);
        
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${x}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('Connection closed');
        console.log(`Total clients connected: ${wss.clients.size}`);
    });
});

console.log('WebSocket server is running on ws://localhost:2609');
