import "dotenv/config";

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not defined`);
  }

  return value;
};

const mongoUri = getEnv("MONGODB_URI");
const port = getEnv("PORT");

export { mongoUri, port };
