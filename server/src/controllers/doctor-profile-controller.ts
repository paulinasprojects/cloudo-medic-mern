import { Request, Response, NextFunction } from "express";
import { User, DoctorProfile } from "../models";
import { AppError } from "../middleware/error-handler";
import { SendSuccess, asyncHandler } from "../utils/response-helpers";
import { UserRole } from "../types";


export const getDoctorProfile = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId,
        role: UserRole.DOCTOR
      },
      include: [
        {
          model: DoctorProfile,
          as: "doctorProfile"
        }
      ]
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };

    if (!user.doctorProfile) {
      throw new AppError("Doctor not found", 404)
    };
  

    SendSuccess(res, user.doctorProfile, "Profile retrieved successfully!")
  }
)

export const createDoctorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, dateOfBirth, gender, specialization, hospital, licenseNumber, consultationFee, yearsOfExperience } = req.body;
    const userId = req.userId;

      const user = await User.findOne({
        where: {
          id: userId,
        },
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };


    const profile = await DoctorProfile.create({
      userId: userId,
      address,
      phoneNumber,
      bio,
      dateOfBirth,
      gender, 
      specialization,
      hospital,
      licenseNumber,
      yearsOfExperience,
      consultationFee,
    });

    SendSuccess(res, profile, "Profile created successfully", 201);
  }
)

export const updateDoctorProfileByDoctor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, specialization, hospital, consultationFee, yearsOfExperience } = req.body;
    const userId = req.userId;
    
    const profile = await DoctorProfile.findOne({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new AppError("Doctor not found", 404);
    }

    if (address) {
      profile.address = address;
    }

    if (phoneNumber) {
      profile.phoneNumber = phoneNumber;
    }

    if (bio) {
      profile.bio = bio;
    }

    if (specialization) {
      profile.specialization = specialization
    };

    if (hospital) {
      profile.hospital = hospital
    };

    if (consultationFee) {
      profile.consultationFee = consultationFee
    };
    
    if (yearsOfExperience) {
      profile.yearsOfExperience = yearsOfExperience;
    }

    const updatededProfile = await profile.save()
    SendSuccess(res, updatededProfile, "Profile updated successfully!")
  }
)
