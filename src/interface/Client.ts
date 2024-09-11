import { Socket } from "net";

export interface Client {
  id: string;
  socket: Socket;
}
