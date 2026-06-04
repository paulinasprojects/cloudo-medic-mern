import { Request, Response, NextFunction } from "express";
import { asyncHandler, SendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";

import Prescription from "../models/Prescription";
import Appointment from "../models/Appointment";
import DoctorProfile from "../models/DoctorProfile";
import PatientProfile from "../models/PatientProfile";
import MedicalTest from "../models/MedicalTest";
import User from "../models/User";
import { AppointmentStatus, MedicalTestStatus } from "../types";

const allIncludes = [
  {
    model: DoctorProfile,
    as: "doctorProfile",
    include: [{ model: User, as: "user", attributes: { exclude: ["password"] } }],
  },
  {
    model: PatientProfile,
    as: "patientProfile",
    include: [{ model: User, as: "user", attributes: { exclude: ["password"] } }],
  },
];


export const getAllDoctors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const doctors = await DoctorProfile.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password"]
          }
        }
      ],
      order: [["createdAt", "ASC"]]
    })

    return SendSuccess(res, doctors, "Doctors retrieved successfully")
  }
)
export const getAllPatients = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const patients = await PatientProfile.findAll({
       include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password"]
          }
        }
      ],
      order: [["createdAt", "ASC"]]
    });
     
    SendSuccess(res, patients, "Patients retrieved successfully")
  }
)

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const users = await User.findAll({
      order: [["createdAt", "ASC"]],
      attributes: {
         exclude: ["password"] 
      }
    });

    SendSuccess(res, users, "Users retrieved successfully")
  }
)

export const updateUserByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
     const { email,  password, firstName, lastName, role } = req.body;
     const { id } = req.params;
     const userId = req.userId;
      
    const user = await User.findOne({
          where: {
            id: userId
          }
        });

    if (!user) {
      throw new AppError("User not found", 404)
    }

     const userToUpdate = await User.findOne({
      where: {
        id
      }
     });

     if (!userToUpdate) {
      throw new AppError("User not found", 404)
     }

      if (email) {
      userToUpdate.email = email.toLowerCase().trim()
    }


    if (password) {
      userToUpdate.password = password;
    }

    if (firstName) {
      userToUpdate.firstName = firstName
    };

    if (lastName) {
      userToUpdate.lastName = lastName
    }

    if (role) {
      userToUpdate.role = role
    }

    const updatedUser = await userToUpdate.save();

    SendSuccess(res, updatedUser.toSafeJSON(), "User updated successfully")
  }
)

export const deleteUserByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;
      
    const user = await User.findOne({
          where: {
            id: userId
          }
        });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const userToDelete = await User.findOne({
      where: {
        id
      }
    });

    if (!userToDelete) {
      throw new AppError("User not found", 404)
    }

    await userToDelete.destroy();

    SendSuccess(res, null, "User deleted successfully");
  }
)

export const updateDoctorProfileByAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, dateOfBirth, doctorLevel, education, licenseNumber, specialization, hospital, consultationFee, yearsOfExperience } = req.body;
    const { id } = req.params;
     const userId = req.userId;
     const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }


    const profile = await DoctorProfile.findOne({
      where: {
        id
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

    if (dateOfBirth) {
      profile.dateOfBirth = dateOfBirth;
    }

    if (education) {
      profile.education = education;
    }

    if (doctorLevel) {
      profile.doctorLevel = doctorLevel;
    }

    if (specialization) {
      profile.specialization = specialization
    };

    if (hospital) {
      profile.hospital = hospital
    };

    if (licenseNumber) {
      profile.licenseNumber = licenseNumber
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

export const deleteDoctorProfileByAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.userId;
  const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

  const profile = await DoctorProfile.findOne({
    where: {
        id
      },
    });

    if (!profile) {
      throw new AppError("Doctor not found", 404);
    }


    await profile.destroy();

    SendSuccess(
      res,
      null,
      "Doctor deleted successfully!"
    );
  }
)

export const updatePatientProfileByAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, phoneNumber, bio, dateOfBirth, gender, bloodType, emergencyContactName, emergencyContactNumber, allergies, medicalHistory } = req.body;
    const { id } = req.params;
    const userId = req.userId;
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const profile = await PatientProfile.findOne({
      where: {
        id
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

    if (bio) {
      profile.bio = bio;
    }

    if (dateOfBirth) {
      profile.dateOfBirth = dateOfBirth;
    }

    if (gender) {
      profile.gender = gender
    }

    if (bloodType) {
      profile.bloodType = bloodType
    }


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

    SendSuccess(res, updatedProfile, "Profile updated successfully");
  }
)

export const deletePatientProfileByAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   const userId = req.userId;
   const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }
  
   const profile = await PatientProfile.findOne({
      where: {
       id
      },
    });

    if (!profile) {
      throw new AppError("Patient not found", 404);
    }


    await profile.destroy();

    SendSuccess(
      res,
      null,
      "Patient deleted successfully!"
    );
  }
)

export const getAllAppointmentsByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const appointments = await Appointment.findAll({
      include: allIncludes,
      order: [["appointmentDate", "ASC"]]
    });
    
    SendSuccess(res, appointments, "Appointments retrieved successfully!");
  }
)

export const getAppointmentsByDoctorId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { doctorId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

     if (!user) {
      throw new AppError("User not found", 404)
    };


    const doctorProfile = await DoctorProfile.findOne({
      where: {
        id: doctorId,
      }
    });

    if (!doctorProfile) {
      throw new AppError("Doctor not found", 404)
    };

    const appointments = await Appointment.findAll({
      where: {
        doctorId
      },
      include: allIncludes,
      order: [["appointmentDate", "ASC"]]
    });
    SendSuccess(res, appointments, "Appointments retrieved successfully")
}
)

export const getAppointmentsByPatientId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { patientId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

     if (!user) {
      throw new AppError("User not found", 404)
    };


    const patientProfile = await PatientProfile.findOne({
      where: {
        id: patientId,
      }
    });

    if (!patientProfile) {
      throw new AppError("Patient not found", 404)
    }

    const appointments = await Appointment.findAll({
      where: {
        patientId
      },
      include: allIncludes,
      order: [["appointmentDate", "ASC"]]
    });

    SendSuccess(res, appointments, "Appointments retrievd successfully")
  }
)

export const getAppointmentByIdByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const appointment = await Appointment.findOne({
      where: {
        id
      },
      include: allIncludes
    });

    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    SendSuccess(res, appointment, "Appointment retrieved successfully");
  }
)

export const updateAppointmentByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { appointmentDate, notes, status } = req.body;
    const { id } = req.params;
    const userId = req.userId; 

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const appointment = await Appointment.findOne({
      where: {
        id
      }
    });

    if (!appointment) {
      throw new AppError("Appointment not found", 404)
    }

    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new AppError(
        `Cannot update an appointment that is already ${appointment.status}`, 400
      )
    };

    if (status !== undefined) {
      appointment.status = status
    };

    const date = appointmentDate ? new Date(appointmentDate) : new Date();
    const today = new Date();

    if (date < today) {
      throw new AppError("Cannot create an appointment for a past date", 400)
    }

    if (appointmentDate !== undefined) {
      appointment.appointmentDate = date;
    }

    if (notes !== undefined) appointment.notes = notes;

    const updatedAppointment = await appointment.save();

    SendSuccess(res, updatedAppointment, "Appointment updated successfully");  }
)

export const deleteAppointmentByAdmins = asyncHandler(
  async (res: Response, req: Request, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const appointment = await Appointment.findOne({
      where: {
        id
      }
    });

    if (!appointment) {
      throw new AppError("Appointment not found", 404)
    }

    await appointment.destroy();

    SendSuccess(res, null, "Appointment deleted successfully");
  }
)

export const getAllPrescriptionsByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };
  
      const prescriptions = await Prescription.findAll({
        include: allIncludes,
        order: [["startDate", "ASC"]]
      });
      return SendSuccess(res, prescriptions, "Prescriptions retrieved successfully")
  }
)

export const getPrescriptionsByPatientId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { patientId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

      if (!user) {
      throw new AppError("User not found", 404)
    };


    const patientProfile = await PatientProfile.findOne({
      where: {
        id: patientId,
      }
    });

    if (!patientProfile) {
      throw new AppError("Patient not found", 404)
    }

    const prescriptions = await Prescription.findAll({
      where: {
        patientId
      },
      include: allIncludes,
      order: [["startDate", "ASC"]]
    });
    
    SendSuccess(res, prescriptions, "Prescriptions retrived successfully")
  }
)

export const getPrescriptionsByDoctorId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { doctorId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }


    const doctorProfile = await DoctorProfile.findOne({
      where: {
        id: doctorId,
      }
    });

    if (!doctorProfile) {
      throw new AppError("Doctor not found", 404)
    };

    const prescriptions = await Prescription.findAll({
      where: {
        doctorId
      },
      include: allIncludes,
      order: [["startDate", "ASC"]]
    });

    SendSuccess(res, prescriptions, "Prescriptions retrieved successfully")
  }
)

export const getPrescriptionByIdByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;
    
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };

    const prescription = await Prescription.findOne({
      where: {
        id
      },
      include: allIncludes
    });

    if (!prescription) {
      throw new AppError("Prescription not found", 404)
    };

    SendSuccess(res, prescription, "Prescription retrieved successfully")
  }
)

export const updatePrescriptionByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { dosage, instructions, endDate } = req.body;
    const { id } = req.params;
    const userId = req.userId;
    
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const prescription = await Prescription.findOne({
      where: {
        id
      }
    });

    if (!prescription) {
      throw new AppError("Prescription not found", 404)
    }

    if (endDate !== undefined) {
      const date = endDate ? new Date(endDate) : new Date();
      const today = new Date();

      if (date < today) {
        throw new AppError("Cannot extends prescription for a past date", 400)
      };
      prescription.endDate = date;
    }

    if (dosage !== undefined) {
      prescription.dosage = dosage;
    }

    if (instructions !== undefined) {
      prescription.instructions = instructions;
    }

    const updatedPrescription = await prescription.save();

    SendSuccess(res, updatedPrescription, "Prescription updated successfully")
  }
)

export const deletePrescriptionByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const prescription = await Prescription.findOne({
      where: {
        id
      }
    });

    if (!prescription) {
      throw new AppError("Prescription not found", 404)
    };

    await prescription.destroy();
    SendSuccess(res, null, "Prescription deleted successfully!")
  }
)

export const getAllMedicalTestsByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };
  
      const allMedicalTests = await MedicalTest.findAll({
        include: allIncludes,
        order: [["date", "ASC"]]
      });
      return SendSuccess(res, allMedicalTests, "All medical tests retrieved successfully")
  }
)

export const getAllScheduledTestsByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    
      const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };

    const scheduledMedicalTests = await MedicalTest.findAll({
      where: {
        status: MedicalTestStatus.SCHEDULED
      },
      include: allIncludes,
      order: [["date", "ASC"]]
    });
      
      SendSuccess(res, scheduledMedicalTests, "Scheduled tests retrieved successfully")
  }
)
export const getAllCompletedTestsByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    
      const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    };

    const completedMedicalTests = await MedicalTest.findAll({
      where: {
        status: MedicalTestStatus.COMPLETED
      },
      include: allIncludes,
      order: [["date", "ASC"]]
    });
      
      SendSuccess(res, completedMedicalTests, "Completed tests retrieved successfully")
  }
)

export const deleteMedicalTestByAdmins = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const medicalTest = await MedicalTest.findOne({
      where: {
        id
      }
    });

    if (!medicalTest) {
      throw new AppError("Medical test not found", 404)
    };

    await medicalTest.destroy();
    SendSuccess(res, null, "Medical test deleted successfully!")
  }
)