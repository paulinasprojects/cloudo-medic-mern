import { Request, Response, NextFunction } from "express";
import { asyncHandler, SendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";
import { AppointmentStatus, UserRole } from "../types";

import Appointment from "../models/Appointment";
import DoctorProfile from "../models/DoctorProfile";
import PatientProfile from "../models/PatientProfile";
import User from "../models/User";

const appointmentIncludes = [
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
 

export const getAllAppointmentsByDoctors = asyncHandler(
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
      throw new AppError("Only a doctor can get all appointments", 403);
    }

    
    if (user.role === UserRole.DOCTOR) {
      const doctorProfile = await DoctorProfile.findOne({
        where: {
          userId
        }
      });

      if (!doctorProfile) {
        throw new AppError("Doctor not found",404)
      }

      const appointments = await Appointment.findAll({
        where: {
          doctorId: doctorProfile.id,
        },
        include: appointmentIncludes,
        order: [["appointmentDate", "ASC"]]
      });

      return SendSuccess(res, appointments, "Appointments retrieved successfully!")
    };
  }
)

export const getAllAppointmentsByPatients = asyncHandler(
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
      throw new AppError("Only a patient can get all appointments", 403);
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

      const appointments = await Appointment.findAll({
        where: {
          patientId: patientProfile.id,
        },
        include: appointmentIncludes,
        order: [["appointmentDate", "ASC"]]
      });
        
      return SendSuccess(res, appointments, "Appointments retrieved successfully!")
    }
  }
)


export const getAppointmentByIdByDoctor = asyncHandler(
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
      include: appointmentIncludes
    });

    if (!appointment) {
      throw new AppError("Appointment not found", 404)
    };

    if (user.role === UserRole.DOCTOR) {
      const doctorProfile = await DoctorProfile.findOne({
        where: {
          userId
        }
      });

      if (!doctorProfile || appointment.doctorId !== doctorProfile.id) {
        throw new AppError("You do not have access to this appointment", 403)
      }
    }

    SendSuccess(res, appointment, "Appointment retrieved successfully")
  }
)

export const getAppointmentByIdByPatient = asyncHandler(
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
      include: appointmentIncludes
    });

    if (!appointment) {
      throw new AppError("Appointment not found", 404)
    };

    if (user.role === UserRole.PATIENT) {
      const patientProfile = await PatientProfile.findOne({
        where: {
          userId
        }
      });

      if (!patientProfile || appointment.patientId !== patientProfile.id) {
        throw new AppError("You do not have access to this appointment", 403)
      }
    }

    SendSuccess(res, appointment, "Appointment retrieved successfully")
  }
)

export const createAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { patientId, appointmentDate, notes } = req.body;
    const userId = req.userId; 

    if (!patientId || !appointmentDate) {
      throw new AppError("Please provide a patient and an appointment date", 400);
    }

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

     if (!user) {
          throw new AppError("User not found", 404);
      }

     
    if (user.role !== UserRole.DOCTOR) {
      throw new AppError("Only doctors can create appointments", 403)
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

    const conflictingDate = await Appointment.findOne({
      where: {
        doctorId: doctorProfile.id,
        appointmentDate,
        status: AppointmentStatus.SCHEDULED
      }
    });

    if (conflictingDate) {
      throw new AppError("This time slot is already booked. Please choose a different date", 409)
    }

    const date = appointmentDate ? new Date(appointmentDate) : new Date();
    const today = new Date();

    if (date < today) {
      throw new AppError("Cannot create an appointment for a past date", 400)
    }

    const appointment = await Appointment.create({
      doctorId: doctorProfile.id,
      patientId,
      appointmentDate: date,
      notes: notes ?? null,
      status: AppointmentStatus.SCHEDULED
    });

    SendSuccess(res, appointment, "Appointment created successfully!", 201);
  }
)

export const updateAppointmentByDoctors = asyncHandler(
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

    if (user.role !== UserRole.DOCTOR) {
        throw new AppError("Only a doctor can update this appointment", 403);
    }

    const appointment = await Appointment.findOne({
      where: {
        id
      }
    });

    if (!appointment) {
      throw new AppError("Appointment not found", 404)
    }

    // if (appointment.status !== AppointmentStatus.SCHEDULED) {
    //   throw new AppError(
    //     `Cannot update an appointment that is already ${appointment.status}`, 400
    //   )
    // };

    if (user.role === UserRole.DOCTOR) {
      const doctorProfile = await DoctorProfile.findOne({
        where: {
          userId
        }
      });

      if (!doctorProfile || appointment.doctorId !== doctorProfile.id) {
        throw new AppError("You do not have access to this appointment", 403)
      }

      if (status !== undefined) {
        const allowedTransitions: AppointmentStatus[] = [
          AppointmentStatus.COMPLETED,
          AppointmentStatus.CANCELLED
        ];

        if (!allowedTransitions.includes(status)) {
          throw new AppError("Doctors can only mark an appointment as completed or cancelled", 400)
        }

        appointment.status = status;
      }

      if (notes !== undefined) appointment.notes = notes;

      const date = appointmentDate ? new Date(appointmentDate) : new Date();
      const today = new Date();

      if (date < today) {
        throw new AppError("Cannot create an appointment for a past date", 400)
      }

      if (appointmentDate !== undefined) appointment.appointmentDate = date;
    }

    const updatedAppointment = await appointment.save();

    SendSuccess(res, updatedAppointment, "Appointment updated successfully");  
  }
)
export const updateAppointmentByPatients = asyncHandler(
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

    if (user.role !== UserRole.PATIENT) {
      throw new AppError("Only a patient can update this appointment", 403);
    }


    const appointment = await Appointment.findOne({
      where: {
        id
      }
    });

    if (!appointment) {
      throw new AppError("Appointment not found", 404)
    }


    if (user.role === UserRole.PATIENT) {
      const patientProfile = await PatientProfile.findOne({
        where: {
          userId
        }
      });

      if (!patientProfile || appointment.patientId !== patientProfile.id) {
        throw new AppError("You do not have access to this appointment", 403)
      }

      if (status && status !== AppointmentStatus.CANCELLED)  {
       throw new AppError("Patients can only cancel appointments", 400)
      }

      if (status !== undefined) appointment.status = status;
    }

    const updatedAppointment = await appointment.save();

    SendSuccess(res, updatedAppointment, "Appointment updated successfully");  
  }
)