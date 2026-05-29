import { Request, Response, NextFunction } from "express";
import { asyncHandler, SendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";
import { UserRole } from "../types";
import {Op} from "sequelize";


import Prescription from "../models/Prescription";
import DoctorProfile from "../models/DoctorProfile";
import PatientProfile from "../models/PatientProfile";
import User from "../models/User";

const prescriptionIncludes = [
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


export const getAllPrescriptionsByDoctors = asyncHandler(
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

     if (user.role !== UserRole.DOCTOR) {
      throw new AppError("Only a doctor can get all prescriptions", 403);
    }

    if (user.role === UserRole.DOCTOR) {
      const doctorProfile = await DoctorProfile.findOne({
        where: {
          userId
        }
      });

      if (!doctorProfile) {
        throw new AppError("Doctor not found", 404)
      }

      const prescriptions = await Prescription.findAll({
        where: {
          doctorId: doctorProfile.id
        },
        include: prescriptionIncludes,
        order: [["startDate", "ASC"]],
      });

      return SendSuccess(res, prescriptions, "Prescriptions retrieved successfully")
    }
  }
)

export const getAllPrescriptionsByPatients = asyncHandler(
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

    if (user.role !== UserRole.PATIENT) {
      throw new AppError("Only a patient can get all prescriptions", 403);
    }

    if (user.role === UserRole.PATIENT) {
      const patientProfile = await PatientProfile.findOne({
        where: {
          userId
        }
      });

      if (!patientProfile) {
        throw new AppError("Patient not found", 404)
      }

      const prescriptions = await Prescription.findAll({
        where: {
          patientId: patientProfile.id
        },
        include: prescriptionIncludes,
        order: [["startDate", "ASC"]]
      });

      return SendSuccess(res, prescriptions, "Prescriptions retrieved successfully")
    }
  }
)


export const getActivePrescriptionsByPatients = asyncHandler(
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

    if (user.role !== UserRole.PATIENT) {
      throw new AppError("Only a patient can get active prescriptions", 403);
    }

    if (user.role === UserRole.PATIENT) {
    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });
  
      if (!patientProfile) {
        throw new AppError("Patient not found", 404)
      }
      const today = new Date();

      const prescriptions = await Prescription.findAll({
        where: {
          patientId: patientProfile.id,
          startDate: {
             [Op.lt]: today,
          },
          endDate: { 
            [Op.gte]: today
          },
        },
        include: prescriptionIncludes,
        order: [["startDate", "ASC"]]
      });
      
      return SendSuccess(res, prescriptions, "Active prescriptions retrieved successfully!")
    };
  }
)

export const getExpiredPrescriptionsByPatients = asyncHandler(
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

    if (user.role !== UserRole.PATIENT) {
      throw new AppError("Only a patient can get expired prescriptions", 403);
    }

     if (user.role === UserRole.PATIENT) {
    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });
  
      if (!patientProfile) {
        throw new AppError("Patient not found", 404)
      }
      const today = new Date();

      const prescriptions = await Prescription.findAll({
        where: {
          patientId: patientProfile.id,
          endDate: { 
            [Op.lt]: today
          },
        },
        include: prescriptionIncludes,
        order: [["endDate", "DESC"]]
      });
      
      return SendSuccess(res, prescriptions, "Active prescriptions retrieved successfully!")
    }
  }
)

export const getPrescriptionByIdByDoctors = asyncHandler(
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
      },
      include: prescriptionIncludes
    });

    if (!prescription) {
      throw new AppError("Prescription not found", 404)
    };

    if (user.role === UserRole.DOCTOR) {
      const doctorProfile = await DoctorProfile.findOne({
        where: {
          userId
        }
      });

      if (!doctorProfile || prescription.doctorId !== doctorProfile.id) {
        throw new AppError("You do not have access to this prescription", 403)
      };

      SendSuccess(res, prescription, "Prescription retrieved successfully")
    }
  }
)

export const getPrescriptionByIdByPatients = asyncHandler(
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
      },
      include: prescriptionIncludes
    });

    if (!prescription) {
      throw new AppError("Prescription not found", 404)
    }

    if (user.role === UserRole.PATIENT) {
      const patientProfile = await PatientProfile.findOne({
        where: {
          userId
        }
      });

      if (!patientProfile || prescription.patientId !== patientProfile.id) {
        throw new AppError("You do not have access to this prescription", 403)
      }
    }

    SendSuccess(res, prescription, "Prescription retrieved successfully");
  }
)

export const createPrescription = asyncHandler(
  async ( req: Request, res: Response, next: NextFunction ) => {
    const { patientId, medication, dosage, instructions, startDate, endDate } = req.body;
    const userId = req.userId;

    if (!patientId || !startDate || !endDate) {
      throw new AppError("Please provide a patient,start date and end date to create an appointment", 400);
    }

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    if (user.role !== UserRole.DOCTOR) {
      throw new AppError("Only doctors can create prescriptions", 403)
    };

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile) {
      throw new AppError("Doctor not found", 404)
    }

    const patientProfile = await PatientProfile.findOne({
      where: {
        id: patientId
      }
    });

    if (!patientProfile) {
      throw new AppError("Patient not found", 404)
    }

    const date = startDate ? new Date(startDate) : new Date();
    const today = new Date();

    if (date < today) {
      throw new AppError("Cannot create an prescriptions for a past date", 400)
    };

    const prescription = await Prescription.create({
      doctorId: doctorProfile.id,
      patientId,
      startDate: date,
      endDate,
      instructions: instructions.trim(),
      medication,
      dosage: dosage ?? null,
    });

    SendSuccess(res, prescription, "Prescription created successfully!", 201)
  }
)

export const updatePrescription = asyncHandler(
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

    if (user.role !== UserRole.DOCTOR) {
      throw new AppError("Only doctors can create prescriptions", 403)
    };

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || prescription.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this prescription", 403)
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