import { Response, Request, NextFunction } from "express";
import { User } from "../models";
import { generateToken } from "../utils/token-hepers";
import { asyncHandler, SendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName, role } = req.body;
  
    if (!email || !password) {
      throw new AppError("Please provide an email and password", 400)
    };

    const user = await User.create({
      email: email.trim().toLowerCase(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role
    });

    SendSuccess(res, user.toSafeJSON(), "User registed successfully", 201);
  }
)

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Please provide a valid email and password", 400);
    };

    const user = await User.findOne({
      where: {
        email: email.toLowerCase()
      }
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id);

    const authResponse = {
      user: user.toSafeJSON(),
      token: token,
    }

    SendSuccess(res, authResponse, "Logged in succesfuly", 200);
  }
)