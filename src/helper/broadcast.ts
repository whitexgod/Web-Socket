import { Client } from "../interface/Client";
import { formatMessage } from "./formatMessage";

// Modify the broadcast function to include the sender's identifier
export const broadcast = (senderId: string, message: string, clients: Map<string, Client>) => {
    // Send the message to all connected clients except the sender
    clients.forEach((client, clientId) => {
      if (clientId !== senderId && client.socket.writable) {
        client.socket.write(formatMessage(message));
      }
    });
  }