import { Request, Response, NextFunction } from "express";
import { PatientProfile, User } from "../models";
import { AppError } from "../middleware/error-handler";
import { SendSuccess, asyncHandler } from "../utils/response-helpers";
import { UserRole } from "../types";

export const getPatientProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;

      const user = await User.findOne({
        where: {
          id: userId,
          role: UserRole.PATIENT
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
        throw new AppError("Patient profile not found", 404);
      };

      SendSuccess(res, user.patientProfile, "Profile retrieved successfully");
  }
)


export const createPatientProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, dateOfBirth, gender, bloodType, emergencyContactName, emergencyContactNumber, allergies, medicalHistory } = req.body;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId,
        role: UserRole.PATIENT
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    };

      if (user.role !== UserRole.PATIENT) {
      throw new AppError("You are not a patient", 400)
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
      medicalHistory
    });

    SendSuccess(res, profile, "Profile created successfuly", 201);
  }
)


export const updatePatientProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, emergencyContactName, emergencyContactNumber, allergies, medicalHistory } = req.body;
    const userId = req.userId;

    const profile = await PatientProfile.findOne({
      where: {
        userId
      },
      include: [
        {
          model: User,
          where: {
            role: UserRole.PATIENT
          }
        }
      ]
    });

    if (!profile) {
      throw new AppError("Patient profile not found", 404)
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

    if (allergies) {
      profile.allergies = allergies
    }

    if (medicalHistory) {
      profile.medicalHistory = medicalHistory;
    }

    const updatedProfile = await profile.save();

    SendSuccess(res, updatedProfile, "Profile updated successfuly");
  }
)

export const deletePatientProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const profile = await PatientProfile.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          where: {
            role: UserRole.PATIENT,
          },
        },
      ],
    });

    if (!profile) {
      throw new AppError("Patient profile not found", 404);
    }

    await profile.destroy();

    SendSuccess(
      res,
      null,
      "Patient profile deleted successfully!"
    );
  }
)