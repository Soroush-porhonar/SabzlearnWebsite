import "dotenv/config";

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not defined`);
  }

  return value;
};

const MONGODB_URI = getEnv("MONGODB_URI");
const PORT = getEnv("PORT");
const JWT_SECRET = getEnv("JWT_SECRET");
export { MONGODB_URI, PORT, JWT_SECRET };
