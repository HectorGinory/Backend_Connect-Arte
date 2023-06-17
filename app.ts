import express from "express";
import mongoose from "mongoose";
import routerUser from "./entities/user/router.js";
import routerVacancies from "./entities/jobVacancies/router.js";
import config from "./config.js";
import cors from "cors";
import { seedUsers, seedVacancies } from "./core/seeder.js";

export const app = express();

mongoose
  .connect(config.DDBB!)
  .then(() => {
    console.log("Connected to the database");

    // seedUsers(10).then(() => {
    //   seedVacancies(10).then(() => {
    //     console.log("Datos enviados");
    //   });
    // }).catch(e => {
    //   console.log(e)
    // });
  }
  )
  .catch((e) => {
    console.log("ERROR:", e);
  });

const handlerError = (err: Error, req, res, next) => {
  console.log(err);
  if (err.message === "NO_TOKEN") {
    return res
      .status(400)
      .json({ code: err.message, message: "Debes tener ña sesión iniciada" });
  }
  if (err.message === "NO_AUTH") {
    return res
      .status(401)
      .json({
        code: err.message,
        message: "No tienes autorización para hacer esto",
      });
  }
  if (err.message === "INFO_LEFT") {
    return res
      .status(400)
      .json({ code: err.message, message: "Falta información por rellenar" });
  }
  if (err.message === "NO_VACANCIE") {
    return res
      .status(404)
      .json({ code: err.message, message: "No se ha encontrado esa oferta" });
  }
  if (err.message === "NO_USER") {
    return res
      .status(404)
      .json({ code: err.message, message: "No se ha encontrado ese usuario" });
  }

  return res
    .status(500)
    .json({ code: "SERVER_ERROR", message: "Error de servidor" });
};

let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/user", routerUser);
app.use("/vacancies", routerVacancies);
app.use(handlerError);
app.listen(config.PORT, () => console.log(`Server up in port ${config.PORT}`));
