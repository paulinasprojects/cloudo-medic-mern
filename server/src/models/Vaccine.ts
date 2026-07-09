import { CreationOptional, DataTypes, InferAttributes, ForeignKey, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";
import { VaccineStatus } from "../types";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";

export class Vaccine extends Model<InferAttributes<Vaccine>,
InferCreationAttributes<Vaccine>> {
  declare id: CreationOptional<string>;
  declare patientId: ForeignKey<PatientProfile["id"]>;
  declare doctorId: ForeignKey<DoctorProfile["id"]>;
  declare vaccinationName: string;
  declare vaccinationDate: Date;
  declare status: CreationOptional<VaccineStatus>;
  declare notes: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare doctorProfile?: NonAttribute<DoctorProfile>;
  declare patientProfile?: NonAttribute<PatientProfile>;
}

Vaccine.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "patient_profiles",
      key: "id"
    }
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "doctor_profiles",
      key: "id"
    }
  },
  vaccinationName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Vaccine name cannot be empty"
      }
    }
  },
  vaccinationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        args: true,
        msg: "Vaccine date must be a date"
      }
    }
  },
  status: {
    type: DataTypes.ENUM(...Object.values(VaccineStatus)),
    allowNull: false,
    validate: {
      isIn: {
        args: [Object.values(VaccineStatus)],
        msg: `Vaccine must be one of: ${Object.values(VaccineStatus)}`
      }
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  sequelize,
  tableName: "vaccines",
  modelName: "Vaccine",
  indexes: [
    {
      fields: ["doctorId"]
    },
    {
      fields: ["patientId"]
    },
    {
      fields: ["vaccinationDate"]
    }
  ]
}
)

export default Vaccine;