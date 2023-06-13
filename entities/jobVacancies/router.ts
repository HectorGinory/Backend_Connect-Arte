import express from 'express';
import { createVacancie, getVacancies } from './controller.js';
// import { auth } from '../../core/mdw.js';

const router = express.Router();

router.post('/',async (req, res, next) => {
    try {
        const newVacancie = await createVacancie(req.body);
        return res.json(newVacancie);
    } catch (error) {
        next(error);
    }
});

router.get('/',async (req, res, next) => {
    try {
        const vacancieList = await getVacancies(req.query);
        return res.json(vacancieList);
    } catch (error) {
        next(error);
    }
});


export default router;
