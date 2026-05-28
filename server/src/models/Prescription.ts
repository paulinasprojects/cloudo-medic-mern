import { CreationOptional, DataTypes, InferAttributes, ForeignKey, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";

export class Prescription extends Model<InferAttributes<Prescription>,
InferCreationAttributes<Prescription>> {
  declare id: CreationOptional<string>;
  declare patientId: ForeignKey<PatientProfile["id"]>;
  declare doctorId: ForeignKey<PatientProfile["id"]>;
  declare medication: string | string[];
  declare dosage: CreationOptional<string | string[] | null>;
  declare instructions: string;
  declare startDate: Date;
  declare endDate: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare doctorProfile?: NonAttribute<DoctorProfile>;
  declare patientProfile?: NonAttribute<PatientProfile>;
}

Prescription.init({
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
    },
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
     references: {
      model: "doctor_profiles",
      key: "id"
    },
  },
  medication: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  instructions:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        args: true,
        msg: "Start date must be a date"
      }
    }
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
    isDate: {
      args: true,
      msg: "End date must be a date"
      }
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  sequelize,
  tableName: "prescriptions",
  modelName: "Prescrition",
  indexes: [
    {
      fields: ["doctorId"],
    },
    {
      fields: ["patientId"],
    },
  ]
}
)

export default Prescription;