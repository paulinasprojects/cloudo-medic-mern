import { CreationOptional, DataTypes, InferAttributes, ForeignKey, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";
import { AppointmentStatus } from "../types";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";
export class Appointment extends Model<InferAttributes<Appointment>,
InferCreationAttributes<Appointment>> {
  declare id: CreationOptional<string>;
  declare patientId: ForeignKey<PatientProfile["id"]>;
  declare doctorId: ForeignKey<DoctorProfile["id"]>;
  declare appointmentDate: Date;
  declare status: CreationOptional<AppointmentStatus>;
  declare notes: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare doctorProfile?: NonAttribute<DoctorProfile>;
  declare patientProfile?: NonAttribute<PatientProfile>;
}

Appointment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
       args: true,
       msg: "Appointment date must be a date"
      }
    }
  },
  status: {
    type: DataTypes.ENUM(...Object.values(AppointmentStatus)),
    allowNull: false,
    validate: {
      isIn: {
        args: [Object.values(AppointmentStatus)],
        msg: `Appointment must be one of: ${Object.values(AppointmentStatus).join(" ")}`
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
  tableName: "appointments",
  modelName: "Appointment"
}
)

export default Appointment;