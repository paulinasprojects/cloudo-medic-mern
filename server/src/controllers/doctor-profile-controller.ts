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
      throw new AppError("Doctor profle not found", 404)
    };
  

    SendSuccess(res, user.doctorProfile, "Profile retrieved successfuly!")
  }
)

export const createDoctorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, dateOfBirth, gender, specialization, hospital, licenseNumber, consultationFee, yearsOfExperience } = req.body;
    const userId = req.userId;

      const user = await User.findOne({
        where: {
          id: userId,
          role: UserRole.DOCTOR
        },
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };

    if (user.role !== UserRole.DOCTOR) {
      throw new AppError("You are not a doctor", 400)
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

    SendSuccess(res, profile, "Profile created successfuly", 201);
  }
)

export const updateDoctorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, specialization, hospital, consultationFee, yearsOfExperience } = req.body;
    const userId = req.userId;
    
    const profile = await DoctorProfile.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          where: {
            role: UserRole.DOCTOR,
          },
        },
      ],
    });

    if (!profile) {
      throw new AppError("No doctor profile found", 404);
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

export const deleteDoctorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
     const userId = req.userId;
      const profile = await DoctorProfile.findOne({
        where: {
            userId,
          },
          include: [
            {
              model: User,
              where: {
                role: UserRole.DOCTOR,
              },
            },
          ],
        });
    
        if (!profile) {
          throw new AppError("Doctor profile not found", 404);
        }
    
        await profile.destroy();
    
        SendSuccess(
          res,
          null,
          "Doctor profile deleted successfully!"
        );
  }
)