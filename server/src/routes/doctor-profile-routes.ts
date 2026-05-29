import { Router } from "express";
import { getDoctorProfile, createDoctorProfile, updateDoctorProfileByDoctor } from "../controllers/doctor-profile-controller";
import {requireAuth, requireDoctor } from "../middleware/auth-middleware";

const router = Router();

router.use(requireAuth);
router.use(requireDoctor);

router.get("/",  getDoctorProfile);
router.post("/", createDoctorProfile);
router.post("/", updateDoctorProfileByDoctor);


export default router;