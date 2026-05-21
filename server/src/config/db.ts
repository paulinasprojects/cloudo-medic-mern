import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the .env");
};

const buildConnectionUrl = (url: string): string => {
  const parsed = new URL(url);
  parsed.searchParams.delete("ssl-mode");
  return parsed.toString();
}

const connectionUrl = buildConnectionUrl(DATABASE_URL);

const sequelize = new Sequelize(connectionUrl, {
  dialect: "mysql",
  protocol: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  ssl: true,
  pool: {
     max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
})


export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Database connection establed (Aiven MySQL Database)");
  } catch (error) {
    console.log("Unable to connect to the database", error)
    process.exit(1);
  }
}

export default sequelize;