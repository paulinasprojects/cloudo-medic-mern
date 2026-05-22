import { CreationOptional, DataTypes, InferAttributes, ForeignKey, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Appointment from "./Appointment";

export class PatientProfile extends Model<InferAttributes<PatientProfile>, 
InferCreationAttributes<PatientProfile>> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User["id"]>;
  declare address: string;
  declare phoneNumber: string;
  declare bio: CreationOptional<string | null>;
  declare dateOfBirth: Date;
  declare gender: string;
  declare bloodType: CreationOptional<string | null>;
  declare emergencyContactNumber: string;
  declare emergencyContactName: string;
  declare allergies: CreationOptional<string | null>;
  declare medicalHistory: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user?: NonAttribute<User>
  declare appointents?: NonAttribute<Appointment[]>
}

PatientProfile.init({
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
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Phone Number cannot be empty"
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
        msg: "Date of birth cannot be empty"
      }
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
  bloodType: {
    type: DataTypes.STRING(25),
    allowNull: true,
    defaultValue: null,
  },
  emergencyContactNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Emergency contact phone number cannot be empty"
      }
    }
  },
  emergencyContactName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Emergency contact name cannot be empty"
      }
    }
  },
  allergies: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    sequelize,
    tableName: "patient_profiles",
    modelName: "PatientProfile"
  }
)


export default PatientProfile;