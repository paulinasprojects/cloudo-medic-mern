import { Request, Response, NextFunction } from "express";
import { PatientProfile, User } from "../models";
import { AppError } from "../middleware/error-handler";
import { SendSuccess, asyncHandler } from "../utils/response-helpers";

export const getPatientProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;

      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: PatientProfile,
            as: "patientProfile"
          }
        ]
      });

      if (!user) {
        throw new AppError("User not found", 404)
      };

      if (!user.patientProfile) {
        throw new AppError("Patient not found", 404);
      };

      SendSuccess(res, user.patientProfile, "Profile retrieved successfully");
  }
)


export const createPatientProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, dateOfBirth, gender, bloodType, emergencyContactName, emergencyContactNumber, allergies } = req.body;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    };

    const profile = await PatientProfile.create({
      userId: userId,
      address,
      phoneNumber,
      bio,
      dateOfBirth,
      gender,
      bloodType,
      emergencyContactName,
      emergencyContactNumber,
      allergies,
    });

    SendSuccess(res, profile, "Profile created successfully", 201);
  }
)


export const updatePatientProfileByPatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, emergencyContactName, emergencyContactNumber } = req.body;
    const userId = req.userId;

    const profile = await PatientProfile.findOne({
      where: {
        userId
      },
    });

    if (!profile) {
      throw new AppError("Patient not found", 404)
    };

    if (address) {
      profile.address = address;
    };

    if (phoneNumber) {
      profile.phoneNumber = phoneNumber
    };

    if (emergencyContactName) {
      profile.emergencyContactName = emergencyContactName;
    }

    if (emergencyContactNumber) {
      profile.emergencyContactNumber = emergencyContactNumber;
    }

    const updatedProfile = await profile.save();

    SendSuccess(res, updatedProfile, "Profile updated successfully");
  }
)