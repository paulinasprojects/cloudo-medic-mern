import { CreationOptional, DataTypes, InferAttributes, ForeignKey, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";
import { MedicalTestStatus, BloodTest, Biochemistry, ImagingTest, Urine } from "../types";

export class MedicalTest extends Model<InferAttributes<MedicalTest>,
InferCreationAttributes<MedicalTest>> {
  declare id: CreationOptional<string>;
  declare patientId: ForeignKey<PatientProfile["id"]>;
  declare doctorId: ForeignKey<DoctorProfile["id"]>;
  declare date: Date;
  declare bloodTests?: CreationOptional<BloodTest>; 
  declare biochemistryTests?: CreationOptional<Biochemistry>; 
  declare imagingTests?: CreationOptional<ImagingTest>; 
  declare urineTests?: CreationOptional<Urine>; 
  declare status: CreationOptional<MedicalTestStatus>;
  declare notes: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare doctorProfile?: NonAttribute<DoctorProfile>;
  declare patientProfile?: NonAttribute<PatientProfile>;
}

MedicalTest.init({
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
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
       args: true,
       msg: "Medical test date must be a date"
      }
    }
  },
  status: {
    type: DataTypes.ENUM(...Object.values(MedicalTestStatus)),
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(MedicalTestStatus)],
          msg: `Medical test must be one of: ${Object.values(MedicalTestStatus).join(" ")}`
        }
      }
  },
  bloodTests: {
    type: DataTypes.ENUM(...Object.values(BloodTest)),
    allowNull: true,
    validate: {
      isIn: {
        args: [Object.values(BloodTest)],
        msg: `Blood test must be one of ${Object.values(BloodTest).join(" ")}`
      }
    }
  },
  biochemistryTests: {
    type: DataTypes.ENUM(...Object.values(Biochemistry)),
    allowNull: true,
    validate: {
      isIn: {
        args: [Object.values(Biochemistry)],
        msg: `Biochemistry test must be one of ${Object.values(Biochemistry).join(" ")}`
      }
    }
  },
  imagingTests: {
    type: DataTypes.ENUM(...Object.values(ImagingTest)),
    allowNull: true,
    validate: {
      isIn: {
        args: [Object.values(ImagingTest)],
        msg: `Imaging test must be one of ${Object.values(ImagingTest).join(" ")}`
      }
    }
  },
  urineTests: {
    type: DataTypes.ENUM(...Object.values(Urine)),
    allowNull: true,
    validate: {
      isIn: {
        args: [Object.values(Urine)],
        msg: `Urine test must be one of ${Object.values(Urine).join(" ")}`
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
  tableName: "medical_tests",
  modelName: "MedicalTest",
  indexes: [
    {
      fields: ["doctorId"]
    },
    {
      fields: ["patientId"]
    },
    {
      fields: ["date"]
    }
  ]
}
)

export default MedicalTest;