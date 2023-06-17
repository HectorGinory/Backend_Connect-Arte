import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import Users from "../entities/user/model.js";
import config from "../config.js";
import JobVacancies from "../entities/jobVacancies/model.js";
import mongoose from "mongoose"

export const seedUsers = async (count) => {
  let users:any = [];
  for (let i = 0; i < count; i++) {
    const name = faker.person.firstName();
    const newUser = new Users({
      name: name,
      email: faker.internet.email(),
      password: await bcrypt.hash("Contraseña1", 1),
      location: faker.location.city(),
      username: name,
    });
    users.push(newUser);
  }
  return await Users.insertMany(users);
};

const jobs = ["Actor", "Actriz", "Director de cine", "Bailarina profesional", "Cantante"]
const sector = ["Teatro", "Cine", "Baile", "Pintura", "Canto"]

export const seedVacancies = async(count) => {
    let vacancies: any = []
    const users = await Users.find({})
    for(let i = 0; i < count; i++) {
       const newVacancie = new JobVacancies({
        created_by: users[Math.round(Math.random()*(users.length - 1))]._id.toString(),
        charge_name: jobs[Math.round(Math.random()*(jobs.length - 1))],
        description : faker.lorem.lines(),
        sector: sector[Math.round(Math.random()*(sector.length - 1))],
        last_day: faker.date.future(),
        location: faker.location.country(),
        question_one: "¿Cuantos años de experiencia tienes en el puesto?"
       })
       vacancies.push(newVacancie)
    }
    return await JobVacancies.insertMany(vacancies)
}