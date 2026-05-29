import jwt from "jsonwebtoken";


export const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT is not defined in the .env file");
  }

  const payload = { userId, role };
  const token = jwt.sign(payload, secret, {
    expiresIn: "7d",
  });

  return token;
}