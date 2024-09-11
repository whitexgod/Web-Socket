export const formatMessage = (message: string): Buffer => {
  const messageBuffer = Buffer.from(message, "utf8");
  const length = messageBuffer.length;
  const frame = Buffer.alloc(length + 2);

  frame[0] = 0x81; // Text frame opcode
  frame[1] = length; // Payload length (for simplicity, assuming length < 126)
  messageBuffer.copy(frame, 2);

  return frame;
};
