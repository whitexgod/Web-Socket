export const parseMessage = (buffer: Buffer): string | null => {
  const firstByte = buffer.readUInt8(0);
  const opcode = firstByte & 0xf;
  if (opcode === 0x8) return null; // Connection close frame
  if (opcode !== 0x1) return null; // Only handle text frames

  const secondByte = buffer.readUInt8(1);
  let length = secondByte & 0x7f;
  let offset = 2;

  if (length === 126) {
    length = buffer.readUInt16BE(2);
    offset = 4;
  } else if (length === 127) {
    return null; // Simplified; assuming no very large frames for now
  }

  const mask = buffer.slice(offset, offset + 4);
  const data = buffer.slice(offset + 4, offset + 4 + length);

  return data.map((byte, i) => byte ^ mask[i % 4]).toString();
};
