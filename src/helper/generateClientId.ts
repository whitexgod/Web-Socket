export const generateClientId = (): string => {
  return crypto.randomUUID(); // Generates a unique UUID for each client
};
