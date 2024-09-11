import * as crypto from "crypto";

export const generateAcceptValue = (secWebSocketKey: string): string => {
  return crypto
    .createHash("sha1")
    .update(secWebSocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11", "binary")
    .digest("base64");
};
