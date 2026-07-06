import { Request, Response, NextFunction } from "express";
import { asyncHandler, SendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";
import { MedicalTestStatus } from "../types";

import MedicalTest from "../models/MedicalTest";
import DoctorProfile from "../models/DoctorProfile";
import PatientProfile from "../models/PatientProfile";
import User from "../models/User";


const testsIncludes = [
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

export const getAllMedicalTestsByPatients = asyncHandler(
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

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });
  
    if (!patientProfile) {
      throw new AppError("Patient not found", 404)
    }

    const allMedicalTests = await MedicalTest.findAll({
      where: {
        patientId: patientProfile.id
      },
      include: testsIncludes,
      order: [["date", "ASC"]]
    });

    SendSuccess(res, allMedicalTests, "All medical tests retrieved successfully")
  }
)
export const getAllMedicalTestsByDoctors = asyncHandler(
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

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });
  
    if (!doctorProfile) {
      throw new AppError("Doctor not found", 404)
    }

    const allMedicalTests = await MedicalTest.findAll({
      where: {
        doctorId: doctorProfile.id
      },
      include: testsIncludes,
      order: [["date", "ASC"]]
    });

    SendSuccess(res, allMedicalTests, "All medical tests retrieved successfully")
  }
)

export const getAllScheduledTestsByPatients = asyncHandler(
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

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });
  
      if (!patientProfile) {
        throw new AppError("Patient not found", 404)
      }

      const scheduledMedicalTests = await MedicalTest.findAll({
        where: {
          patientId: patientProfile.id,
          status: MedicalTestStatus.SCHEDULED
        },
        include: testsIncludes,
        order: [["date", "ASC"]]
      });
      
      SendSuccess(res, scheduledMedicalTests, "Scheduled tests retrieved successfully")
  }
)
export const getAllScheduledTestsByDoctors = asyncHandler(
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

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });
  
      if (!doctorProfile) {
        throw new AppError("Doctor not found", 404)
      }

      const scheduledMedicalTests = await MedicalTest.findAll({
        where: {
          doctorId: doctorProfile.id,
          status: MedicalTestStatus.SCHEDULED
        },
        include: testsIncludes,
        order: [["date", "ASC"]]
      });
      
      SendSuccess(res, scheduledMedicalTests, "Scheduled tests retrieved successfully")
  }
)

export const getScheduledTestByIdByDoctors = asyncHandler(
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

    const medicalTest = await MedicalTest.findOne({
      where: {
        id,
        status: MedicalTestStatus.SCHEDULED
      },
      include: testsIncludes,
    });

    if (!medicalTest) {
      throw new AppError("Medical test not found", 404)
    };

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId,
      }
    });

    if (!doctorProfile || medicalTest.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this medical test", 403)
    }

    SendSuccess(res, medicalTest, "Scheduled medical test retrieved successfully")
  }
)

export const getScheduledTestByIdByPatients = asyncHandler(
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

    const medicalTest = await MedicalTest.findOne({
      where: {
        id,
        status: MedicalTestStatus.SCHEDULED
      },
      include: testsIncludes,
    });

    if (!medicalTest) {
      throw new AppError("Medical test not found", 404)
    };

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile || medicalTest.patientId !== patientProfile.id) {
      throw new AppError("You do not have access to this medical test", 403)
    }

    SendSuccess(res, medicalTest, "Medical test retrieved successfully")
  }
)
export const getCompletedTestByIdByDoctors = asyncHandler(
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

    const medicalTest = await MedicalTest.findOne({
      where: {
        id,
        status: MedicalTestStatus.COMPLETED
      },
      include: testsIncludes,
    });

    if (!medicalTest) {
      throw new AppError("Medical test not found", 404)
    };

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || medicalTest.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this medical test", 403)
    }

    SendSuccess(res, medicalTest, "Completed medical test retrieved successfully")
  }
)

export const getCompletedTestByIdByPatients = asyncHandler(
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

    const medicalTest = await MedicalTest.findOne({
      where: {
        id,
        status: MedicalTestStatus.COMPLETED
      },
      include: testsIncludes,
    });

    if (!medicalTest) {
      throw new AppError("Medical test not found", 404)
    };

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile || medicalTest.patientId !== patientProfile.id) {
      throw new AppError("You do not have access to this medical test", 403)
    }

    SendSuccess(res, medicalTest, "Medical test retrieved successfully")
  }
)

export const getAllCompletedTestsByPatients = asyncHandler(
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

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });
  
      if (!patientProfile) {
        throw new AppError("Patient not found", 404)
      }

      const completedMedicalTests = await MedicalTest.findAll({
        where: {
          patientId: patientProfile.id,
          status: MedicalTestStatus.COMPLETED
        },
        include: testsIncludes,
        order: [["date", "ASC"]]
      });
      
      SendSuccess(res, completedMedicalTests, "Completed tests retrieved successfully")
  }
)

export const getAllCompletedTestsByDoctors = asyncHandler(
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

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });
  
      if (!doctorProfile) {
        throw new AppError("Doctor not found", 404)
      }

      const completedMedicalTests = await MedicalTest.findAll({
        where: {
          doctorId: doctorProfile.id,
          status: MedicalTestStatus.COMPLETED
        },
        include: testsIncludes,
        order: [["date", "ASC"]]
      });
      
      SendSuccess(res, completedMedicalTests, "Completed tests retrieved successfully")
  }
)

export const getMedicalTestByIdByDoctors = asyncHandler(
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

    const medicalTest = await MedicalTest.findOne({
      where: {
        id
      },
      include: testsIncludes,
    });

    if (!medicalTest) {
      throw new AppError("Medical test not found", 404)
    };

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || medicalTest.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this medical test", 403)
    }

    SendSuccess(res, medicalTest, "Medical test retrieved successfully")
  }
)

export const getMedicalTestByIdByPatients = asyncHandler(
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

    const medicalTest = await MedicalTest.findOne({
      where: {
        id
      },
      include: testsIncludes,
    });

    if (!medicalTest) {
      throw new AppError("Medical test not found", 404)
    };

    const patientProfile = await PatientProfile.findOne({
      where: {
        userId
      }
    });

    if (!patientProfile || medicalTest.patientId !== patientProfile.id) {
      throw new AppError("You do not have access to this medical test", 403)
    }

    SendSuccess(res, medicalTest, "Medical test retrieved successfully")
  }
)

export const createMedicalTestByDoctors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { patientId, date, notes, bloodTests, biochemistryTests, imagingTests, urineTests } = req.body;
    const userId = req.userId;

    if (!patientId && !date) {
      throw new AppError("Please provide a patient and a date to create a medical test", 400)
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

     const testDate = date ? new Date(date) : new Date();
     const today = new Date();

     if (testDate < today) {
      throw new AppError("Cannot create a medical test for a past date", 400)
     };

     const medicalTest = await MedicalTest.create({
      doctorId: doctorProfile.id,
      patientId,
      date: testDate,
      biochemistryTests,
      bloodTests,
      imagingTests,
      urineTests,
      notes: notes ?? null,
      status: MedicalTestStatus.SCHEDULED,
     });

     SendSuccess(res, medicalTest, "Medical test created successfully", 201)
  }
);

export const updateMedicalTestByDoctors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, notes, status, bloodTests, biochemistryTests, imagingTests, urineTests } = req.body;
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
  }

    const doctorProfile = await DoctorProfile.findOne({
      where: {
        userId
      }
    });

    if (!doctorProfile || medicalTest.doctorId !== doctorProfile.id) {
      throw new AppError("You do not have access to this medical test", 403)
    }
    
    if (status !== undefined) {
      const allowedTransitions: MedicalTestStatus[] = [
        MedicalTestStatus.PENDING,
        MedicalTestStatus.COMPLETED,
        MedicalTestStatus.CANCELLED,
      ];
    
      if (!allowedTransitions.includes(status)) {
        throw new AppError("Doctors can only mark an medical test as pending, completed, cancelled", 400);
      }

      medicalTest.status = status;
    }

    if (notes !== undefined) {
      medicalTest.notes = notes
    };

     const testDate = date ? new Date(date) : new Date();
     const today = new Date();

     if (testDate < today) {
      throw new AppError("Cannot update a medical test for a past date", 400)
     };

     if (date !== undefined) {
      medicalTest.date = testDate
     }

     if (bloodTests !== undefined) {
      medicalTest.bloodTests = bloodTests;
     }

     if (biochemistryTests !== undefined) {
      medicalTest.biochemistryTests = biochemistryTests;
     }

     if (imagingTests !== undefined) {
      medicalTest.imagingTests = imagingTests;
     }

     if (urineTests !== undefined) {
      medicalTest.urineTests = urineTests;
     }

     const updatedMedicalTest = await medicalTest.save();

     SendSuccess(res, updatedMedicalTest, "Medical test updated successfully")
  }
)