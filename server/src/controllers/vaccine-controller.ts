import { Request, Response, NextFunction } from "express";
import { asyncHandler, SendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";
import { VaccineStatus } from "../types";

import Vaccine from "../models/Vaccine";
import DoctorProfile from "../models/DoctorProfile";
import PatientProfile from "../models/PatientProfile";
import User from "../models/User";

const vaccineIncludes = [
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
]

export const getAllVaccinesByDoctors = asyncHandler(
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

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile) {
      throw new AppError("Doctor not found", 404)
    }

    const vaccines = await Vaccine.findAll({
      where: {
        doctorId: doctorProfile.id,
      },
      include: vaccineIncludes,
      order: [["vaccinationDate", "ASC"]]
    });

    return SendSuccess(res, vaccines, "Vaccines retrieved successfully")
  }
)

export const getAllVaccinesByPatients = asyncHandler(
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

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile) {
      throw new AppError("Patient not found", 404)
    }

    const vaccines = await Vaccine.findAll({
      where: {
        patientId: patientProfile.id
      },
      include: vaccineIncludes,
      order: [["vaccinationDate", "ASC"]]
    });

    return SendSuccess(res, vaccines, "Vaccines retrieved successfully")
  }
)

export const getVaccineByIdByDoctor = asyncHandler(
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

    const vaccine = await Vaccine.findOne({
      where: {
        id
      },
      include: vaccineIncludes
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    };

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || vaccine.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    return SendSuccess(res, vaccine, "Vaccine retrieved successfully")
  }
)

export const getVaccineByIdByPatient = asyncHandler(
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

    const vaccine = await Vaccine.findOne({
      where: {
        id
      },
      include: vaccineIncludes
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    }

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile || vaccine.patientId !== patientProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    return SendSuccess(res, vaccine, "Vaccine retrieved successfully")
  }
)

export const getAllCompletedVaccinesByDoctors = asyncHandler(
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

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile) {
      throw new AppError("Doctor not foud", 404)
    }

    const completedVaccines = await Vaccine.findAll({
      where: {
        doctorId: doctorProfile.id,
        status: VaccineStatus.COMPLETED
      },
      include: vaccineIncludes,
      order: [["vaccinationDate", "ASC"]]
    });

    return SendSuccess(res, completedVaccines, "Completed vaccines retrieved successfully")
  }
)

export const getAllCompletedVaccinesByPatient = asyncHandler(
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

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile) {
      throw new AppError("Patient not found", 404)
    }

    const completedVaccines = await Vaccine.findAll({
      where: {
        patientId: patientProfile.id,
        status: VaccineStatus.COMPLETED
      },
      include: vaccineIncludes,
      order: [["vaccinationDate", "ASC"]]
    });

    return SendSuccess(res, completedVaccines, "Completed vaccines retrieved successfully")
  }
)
export const getAllScheduledVaccinesByDoctors = asyncHandler(
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

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile) {
      throw new AppError("Doctor not found", 404)
    }

    const scheduledVaccines = await Vaccine.findAll({
      where: {
        doctorId: doctorProfile.id,
        status: VaccineStatus.SCHEDULED
      },
      include: vaccineIncludes,
      order: [["vaccinationDate", "ASC"]]
    });

    return SendSuccess(res, scheduledVaccines, "Scheduled vaccines retrieved successfully")
  }
)

export const getAllScheduledVaccinesByPatient = asyncHandler(
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

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile) {
      throw new AppError("Patient not found", 404)
    }

    const scheduledVaccines = await Vaccine.findAll({
      where: {
        patientId: patientProfile.id,
        status: VaccineStatus.SCHEDULED
      },
      include: vaccineIncludes,
      order: [["vaccinationDate", "ASC"]]
    });

    return SendSuccess(res, scheduledVaccines, "Scheduled vaccines retrieved successfully")
  }
)

export const getScheduledVaccineByIdByDoctors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId; 

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const vaccine = await Vaccine.findOne({
      where: {
        id,
        status: VaccineStatus.SCHEDULED
      },
      include: vaccineIncludes,
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    }

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || vaccine.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    return SendSuccess(res, vaccine, "Scheduled vaccine retrieved successfully")
  }
)

export const getScheduledVaccineByIdByPatients = asyncHandler(
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

    const vaccine = await Vaccine.findOne({
      where: {
        id,
        status: VaccineStatus.SCHEDULED
      },
      include: vaccineIncludes,
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    }

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile || vaccine.patientId !== patientProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    return SendSuccess(res, vaccine, "Scheduled vaccine retrieved succesfully")
  }
)


export const getCompletedVaccineByIdByDoctors = asyncHandler(
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

    const vaccine = await Vaccine.findOne({
      where: {
        id,
        status: VaccineStatus.COMPLETED
      },
      include: vaccineIncludes
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    }

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || vaccine.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    return SendSuccess(res, vaccine, "Completed vaccine retrieved successfully")
  }
)

export const getCompletedVaccineByIdByPatients = asyncHandler(
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

    const vaccine = await Vaccine.findOne({
      where: {
        id,
        status: VaccineStatus.COMPLETED
      },
      include: vaccineIncludes
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    }

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile || vaccine.patientId !== patientProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    return SendSuccess(res, vaccine, "Completed vaccine retrieved successfully")
  }
)

export const createVaccine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { patientId, vaccinationName, vaccinationDate, notes } = req.body;
    const userId = req.userId;
    
    if (!patientId && !vaccinationDate && !vaccinationName) {
      throw new AppError("Please provide a patient, vaccine name and vaccine date", 400)
    }

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

    const vaccine = await Vaccine.create({
      doctorId: doctorProfile.id,
      patientId,
      vaccinationDate,
      vaccinationName,
      notes: notes ?? null,
      status: VaccineStatus.SCHEDULED
    });

    return SendSuccess(res, vaccine, "Vaccine created successfully", 201)
  }
)

export const updateVaccineByDoctors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { vaccinationName, vaccinationDate, notes, status  } = req.body;
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

    const vaccine = await Vaccine.findOne({
      where: {
        id
      }
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    }

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || vaccine.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    if (status !== undefined) {
      const allowedTransitions: VaccineStatus[] = [
        VaccineStatus.COMPLETED,
        VaccineStatus.CANCELLED
      ];

      if (!allowedTransitions.includes(status)) {
        throw new AppError("Doctor can only mark an vaccine as completed or cancelled", 400)
      }

      vaccine.status = status
    }

    if (vaccinationName !== undefined) vaccine.vaccinationName = vaccinationName;
    if (notes !== undefined) vaccine.notes = notes;

    const date = vaccinationDate ? new Date(vaccinationDate) : new Date();
    const today = new Date();

    if (date < today) {
      throw new AppError("Cannot create a vaccine for a past date", 400)
    }

    if (vaccinationDate !== undefined) vaccine.vaccinationDate = date;

    const updatedVaccine = await vaccine.save();

    return SendSuccess(res, updatedVaccine, "Vaccine updated successfully")
  }
)

export const updateVaccineByPatients = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
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

    const vaccine = await Vaccine.findOne({
      where: {
        id
      }
    });

    if (!vaccine) {
      throw new AppError("Vaccine not found", 404)
    }

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile || vaccine.patientId !== patientProfile.id) {
      throw new AppError("You do not have access to this vaccine", 403)
    }

    if (status && status !== VaccineStatus.CANCELLED) {
      throw new AppError("Patients can only cancel vaccines", 400)
    }

    if (status !== undefined) vaccine.status = status;

    const updatedVaccine = await vaccine.save();

    return SendSuccess(res, updatedVaccine, "Vaccine updated successfully")
  }
)