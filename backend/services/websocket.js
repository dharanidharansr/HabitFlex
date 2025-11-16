const WebSocket = require('ws');

let wss; // WebSocket server
const challengeUpdates = []; // Store recent updates for new connections

// Initialize WebSocket server
const initWebsocket = (server) => {
  wss = new WebSocket.Server({ noServer: true });
  
  // Handle upgrade requests manually
  server.on('upgrade', (request, socket, head) => {
    // Only handle /ws/challenges path for native WebSocket
    if (request.url.startsWith('/ws/challenges')) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
    // Let Socket.IO handle its own paths (like /socket.io/)
    // by not interfering with other upgrade requests
  });
  
  wss.on('connection', (ws) => {
    console.log('Client connected to Challenge WebSocket');
    
    // Send recent updates to newly connected clients
    if (challengeUpdates.length > 0) {
      try {
        ws.send(JSON.stringify({ 
          type: 'history', 
          updates: challengeUpdates.slice(-20) // Last 20 updates
        }));
      } catch (error) {
        console.error('Error sending WebSocket history:', error);
      }
    }
    
    ws.on('close', (code, reason) => {
      console.log('Client disconnected. Code:', code, 'Reason:', reason.toString());
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket client error:', error);
    });
  });
  
  wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
  });
  
  console.log('WebSocket server initialized');
};

// Send challenge update to all connected clients
const sendChallengeUpdate = (update) => {
  if (!wss) {
    console.error("WebSocket server not initialized");
    return;
  }
  
  // Ensure the username is included in the message
  if (!update.username && update.userId) {
    // If username is missing but we have userId, use "User" as fallback
    update.message = update.message.replace("undefined", "User");
  }
  
  // Add timestamp to update
  const timestampedUpdate = {
    ...update,
    timestamp: new Date().toISOString()
  };
  
  // Broadcast to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(timestampedUpdate));
    }
  });
};

module.exports = {
  initWebsocket,
  sendChallengeUpdate
};