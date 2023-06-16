import express from "express";
import {
  applyVacancie,
  createVacancie,
  getVacancieById,
  getVacancieByUserId,
  getVacancies,
  removeVacancie,
} from "./controller.js";
import { allVacancieInfo, auth, itsCompany, itsUser } from "../../core/mdw.js";
// import { auth } from '../../core/mdw.js';

const router = express.Router();

router.post("/", auth, itsCompany, allVacancieInfo, async (req, res, next) => {
  try {
    const newVacancie = await createVacancie(req.body);
    if (!newVacancie) throw new Error("NO_VACANCIE");
    return res.json(newVacancie);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const vacancieList = await getVacancies(req.query);
    return res.json(vacancieList);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const vacancie = await getVacancieById(req.params.id);
    if (!vacancie) throw new Error("NO_VACANCIE");
    return res.json(vacancie);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id",auth, async (req, res, next) => {
  try {
    const vacancie = await getVacancieByUserId(req.params.id);
    if (!vacancie) throw new Error("NO_VACANCIE");
    return res.json(vacancie);
  } catch (error) {
    next(error);
  }
});

router.post("/apply/:id", auth, itsUser, async (req, res, next) => {
  try {
    const vacancie = await applyVacancie(req.body, req.params.id);
    if (!vacancie) throw new Error("NO_VACANCIE");
    return res.json(vacancie);
  } catch (error) {
    next(error);
  }
});

router.post("/delete/:id", auth, itsCompany, async (req, res, next) => {
  try {
    const vacancie = await removeVacancie(req.params.id);
    if (!vacancie) throw new Error("NO_VACANCIE");
    return res.json(vacancie);
  } catch (error) {
    next(error);
  }
});

export default router;
