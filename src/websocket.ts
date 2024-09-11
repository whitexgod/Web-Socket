import express from "express";
import path from "path";
import config from "./config/config";
import { createServer } from "http";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { Client } from "./interface/Client";
import { generateAcceptValue } from "./helper/generateAcceptValue";
import { generateClientId } from "./helper/generateClientId";
import { parseMessage } from "./helper/parseMessage";
import { broadcast } from "./helper/broadcast";

const app = express();

const clients = new Map<string, Client>();

app.use(express.static(path.join(__dirname, "public")));

const server = createServer(app);

// Serve landing page
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "landingPage", "landingPage.html")
  );
});

// Serve community room page
app.get("/community", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "communityRoom", "communityRoom.html")
  );
});

// Upgrade the HTTP server to handle WebSocket connections
server.on("upgrade", (req: IncomingMessage, socket: Socket, head: Buffer) => {
  console.log("Attaching websocket to this server...");

  if (req.headers["upgrade"] !== "websocket") {
    socket.end("HTTP/1.1 400 Bad Request");
    return;
  }

  const acceptKey = generateAcceptValue(req.headers["sec-websocket-key"]!);
  const responseHeaders = [
    "HTTP/1.1 101 WebSocket Protocol Handshake",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptKey}`,
  ];

  socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");

  // Generate a unique ID for the new client
  const clientId = generateClientId();

  // Add the client to the map with the socket and clientId
  clients.set(clientId, { id: clientId, socket });

  console.log(`Client connected with ID: ${clientId}`);

  socket.on("data", (buffer) => {
    const message = parseMessage(buffer);
    console.log({ message });
    if (message) {
      // Broadcast the message to other clients
      broadcast(clientId, message, clients);
    }
  });

  socket.on("end", () => {
    console.log(`Client ${clientId} disconnected`);
    clients.delete(clientId); // Remove the client when they disconnect
  });
});

// Start the server
const PORT = config.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
