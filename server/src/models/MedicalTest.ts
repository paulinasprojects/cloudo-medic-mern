import { CreationOptional, DataTypes, InferAttributes, ForeignKey, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";
import { MedicalTestStatus, BloodTest, Biochemistry, ImagingTest, Urine } from "../types";
import { AppError } from "../middleware/error-handler";

export class MedicalTest extends Model<InferAttributes<MedicalTest>,
InferCreationAttributes<MedicalTest>> {
  declare id: CreationOptional<string>;
  declare patientId: ForeignKey<PatientProfile["id"]>;
  declare doctorId: ForeignKey<DoctorProfile["id"]>;
  declare date: Date;
  declare bloodTests?: CreationOptional<BloodTest[] | null>; 
  declare biochemistryTests?: CreationOptional<Biochemistry[] | null>; 
  declare imagingTests?: CreationOptional<ImagingTest[] | null>; 
  declare urineTests?: CreationOptional<Urine[] | null>; 
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
          msg: `Medical test must be one of: ${Object.values(MedicalTestStatus).join(", ")}`
        }
      }
  },
  bloodTests: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    validate: {
      isValidBloodTests(value: BloodTest[]) {
        if (!value) return;
        const valid = Object.values(BloodTest);
        const invalid = value.filter(v => !valid.includes(v));
        if (invalid.length > 0) {
          throw new Error(`Invalid blood test: ${invalid.join(", ")}`)
        }
      }
    }
  },
  biochemistryTests: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    validate: {
      isValidBiochemistryTests(value: Biochemistry[]) {
        if (!value) return;
        const valid = Object.values(Biochemistry);
        const invalid = value.filter(v => !valid.includes(v));
        if (invalid.length > 0) {
          throw new Error(`Invalid biochemistry test: ${invalid.join(", ")}`)
        }
      }
    }
  },
  imagingTests: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
     validate: {
      isValidImagingTests(value: ImagingTest[]) {
        if (!value) return;
        const valid = Object.values(ImagingTest);
        const invalid = value.filter(v => !valid.includes(v));
        if (invalid.length > 0) {
          throw new Error(`Invalid imaging test: ${invalid.join(", ")}`)
        }
      }
    }
  },
  urineTests: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
    validate: {
      isValidUrineTests(value: Urine[]) {
        if (!value) return;
        const valid = Object.values(Urine);
        const invalid = value.filter(v => !valid.includes(v));
        if (invalid.length > 0) {
          throw new Error(`Invalid urine test: ${invalid.join(", ")}`)
        }
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
  hooks: {
    beforeCreate: (test: MedicalTest) => {
      const hasTests = test.bloodTests?.length || 
                       test.biochemistryTests?.length ||
                       test.imagingTests?.length || 
                       test.urineTests?.length;
      if (!hasTests) {
        throw new AppError("At least one test must be selected", 400)
      }                 
    }   
  },
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