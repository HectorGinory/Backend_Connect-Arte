import Users from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';
import JobVacancies from './model.js';

export const createVacancie = async (newVacancie) => {
        newVacancie.last_day = new Date(newVacancie.last_day)
        const vacancie =  new JobVacancies(newVacancie);
        return await vacancie.save();
}

export const getVacancies = async(query) => {
        const startIndex = (query.pageNumber - 1) * query.pageSize
        const actualDate = new Date()
        const filter = {
            last_day: { $gt: actualDate },
            $or: [
              { charge_name: { $regex: query.criteria, $options: 'i' } },
              { description: { $regex: query.criteria, $options: 'i' } },
              { sector: { $regex: query.criteria, $options: 'i' } },
              { location: { $regex: query.criteria, $options: 'i' } }
            ]
          }
        const vacanciesList = await JobVacancies.find(filter).skip(startIndex).limit(query.pageSize)
        const totalCount = await JobVacancies.countDocuments(filter)
        const totalPages = Math.ceil(totalCount/query.pageSize)
        const data = {
            "currentPage": query.pageNumber,
            "totalPages": totalPages,
            "data": vacanciesList,
        }

        return data
}

export const getVacancieById = async(id) => {
    const vacancie = await JobVacancies.find({_id: id})
    return vacancie
}