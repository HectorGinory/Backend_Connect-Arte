import express from 'express';
import { createUser, getUserByUsername, userLogIn, editInfoByUserName, editEducationByUserName, editExperienceByUserName } from './controller.js';
// import { auth } from '../../core/mdw.js';

const router = express.Router();

router.post('/',async (req, res, next) => {
    try {
        const newUser = await createUser(req.body);
        return res.json(newUser);
    } catch (error) {
        next(error);
    }
});

router.post('/login',async (req, res, next) => {
    try {
        const token = await userLogIn(req.body);
        if (!token) return next(new Error('NO_TOKEN'));
        return res.json({token});
    } catch (e) {
        next(e);
    }
});

router.get('/:username',async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.params.username);
        return res.json({user});
    } catch (e) {
        next(e);
    }
});

router.put('/info/:username',async (req, res, next) => {
    try {
        const user = await editInfoByUserName(req.params.username, req.body);
        return res.json({user});
    } catch (e) {
        next(e);
    }
});

router.put('/education/:username',async (req, res, next) => {
    try {
        const user = await editEducationByUserName(req.params.username, req.body);
        return res.json({user});
    } catch (e) {
        console.log(e)
        next(e);
    }
});

router.put('/experience/:username',async (req, res, next) => {
    try {
        const user = await editExperienceByUserName(req.params.username, req.body);
        return res.json({user});
    } catch (e) {
        console.log(e)
        next(e);
    }
});
export default router;