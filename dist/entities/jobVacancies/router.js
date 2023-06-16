import express from 'express';
import { applyVacancie, createVacancie, getVacancieById, getVacancieByUserId, getVacancies, removeVacancie } from './controller.js';
// import { auth } from '../../core/mdw.js';
const router = express.Router();
router.post('/', async (req, res, next) => {
    try {
        const newVacancie = await createVacancie(req.body);
        return res.json(newVacancie);
    }
    catch (error) {
        next(error);
    }
});
router.get('/', async (req, res, next) => {
    try {
        const vacancieList = await getVacancies(req.query);
        return res.json(vacancieList);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const vacancie = await getVacancieById(req.params.id);
        return res.json(vacancie);
    }
    catch (error) {
        next(error);
    }
});
router.get('/user/:id', async (req, res, next) => {
    try {
        const vacancie = await getVacancieByUserId(req.params.id);
        return res.json(vacancie);
    }
    catch (error) {
        next(error);
    }
});
router.post('/apply/:id', async (req, res, next) => {
    try {
        const vacancie = await applyVacancie(req.body, req.params.id);
        return res.json(vacancie);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
router.post('/delete/:id', async (req, res, next) => {
    try {
        const vacancie = await removeVacancie(req.params.id);
        return res.json(vacancie);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
export default router;
//# sourceMappingURL=router.js.map