import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { syncModels } from "./models";
import { errorHandler, notFound } from "./middleware/error-handler";
import userRoutes from "./routes/user-routes";
import doctorProfileRoutes from "./routes/doctor-profile-routes";
import patientProfileRoutes from "./routes/patient-profile-routes";
import appointmentRoutes from "./routes/appointment-routes";
import prescriptionsRoutes from "./routes/prescription-routes";
import adminRoutes from "./routes/admin-routes";
import medicalTestsRoutes from "./routes/medical-test-routes";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Cloudo Medic");
});

app.use("/api/auth", userRoutes);
app.use("/api/profile/doctors", doctorProfileRoutes);
app.use("/api/profile/patients", patientProfileRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/medicaltests", medicalTestsRoutes);

app.use(notFound);
app.use(errorHandler);


const bootstrap = async ():Promise<void> => {
  await connectDB();
  await syncModels();
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Api running on http://localhost:${PORT}/api`);
});

bootstrap();


export default app;