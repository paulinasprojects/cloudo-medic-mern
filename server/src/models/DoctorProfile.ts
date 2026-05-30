import { CreationOptional, DataTypes, InferAttributes, ForeignKey, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Appointment from "./Appointment";
import Prescription from "./Prescription";
import MedicalTest from "./MedicalTest";

export class DoctorProfile extends Model<InferAttributes<DoctorProfile>,
InferCreationAttributes<DoctorProfile>> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User["id"]>;
  declare address: string;
  declare phoneNumber: string;
  declare bio: CreationOptional<string | null>;
  declare dateOfBirth: Date;
  declare gender: string;
  declare specialization: string;
  declare hospital: string;
  declare licenseNumber: string;
  declare consultationFee: CreationOptional<number | null>;
  declare yearsOfExperience: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user?: NonAttribute<User>
  declare appointents?: NonAttribute<Appointment[]>
  declare prescriptions?: NonAttribute<Prescription[]>
  declare medicalTests?: NonAttribute<MedicalTest[]>
}

DoctorProfile.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Address cannot be empty"
      }
    }
  },
  phoneNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Phone number cannot be empty"
      }
    }
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        args: true,
        msg: "Date of birth have to be a date"
      },
    }
  },
  gender: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Gender cannot be empty"
      }
    }
  },
  specialization: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Specialization cannot be empty"
      }
    }
  },
  hospital: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Hospital cannot be empty"
      }
    }
  },
  licenseNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "License number cannot be empty"
      }
    }
  },
  consultationFee: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    validate: {
      notEmpty: {
        msg: "Years of experience cannot be empty"
      }
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    sequelize,
    tableName: "doctor_profiles",
    modelName: "DoctorProfile",
  },
)

export default DoctorProfile