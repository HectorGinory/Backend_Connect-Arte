import express from 'express';
import { createUser, getUserByUsername, userLogIn, editInfoByUserName, editEducationByUserName, editExperienceByUserName, deleteEducationByUserName, deleteExperienceByUserName, bringUsersByInterests, bringUsersByRegExp } from './controller.js';
import { auth, sameUser } from '../../core/mdw.js';
const router = express.Router();
router.post('/', async (req, res, next) => {
    try {
        const token = await createUser(req.body);
        if (!token)
            return next(new Error('NO_TOKEN'));
        return res.json({ token: token });
    }
    catch (error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const token = await userLogIn(req.body);
        if (!token)
            return next(new Error('NO_TOKEN'));
        return res.json({ token: token });
    }
    catch (e) {
        next(e);
    }
});
router.get('/byKeyWords', auth, async (req, res, next) => {
    try {
        const users = await bringUsersByInterests(req.query.criteria);
        return res.json({ users });
    }
    catch (e) {
        next(e);
    }
});
router.get('/regExp/:regExpUsername', auth, async (req, res, next) => {
    try {
        const user = await bringUsersByRegExp(req.params.regExpUsername);
        return res.json({ user });
    }
    catch (e) {
        next(e);
    }
});
router.put('/info/:username', auth, sameUser, async (req, res, next) => {
    try {
        const userToken = await editInfoByUserName(req.params.username, req.body);
        if (!userToken)
            throw new Error("ERROR_CREATING_TOKEN");
        return res.json({ token: userToken });
    }
    catch (e) {
        next(e);
    }
});
router.put('/education/:username', auth, sameUser, async (req, res, next) => {
    try {
        const user = await editEducationByUserName(req.params.username, req.body);
        return res.json({ user });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
router.post('/educationDelete/:username', auth, sameUser, async (req, res, next) => {
    try {
        const user = await deleteEducationByUserName(req.params.username, req.body);
        return res.json({ user });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
router.post('/experienceDelete/:username', auth, sameUser, async (req, res, next) => {
    try {
        const user = await deleteExperienceByUserName(req.params.username, req.body);
        return res.json({ user });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
router.put('/experience/:username', auth, sameUser, async (req, res, next) => {
    try {
        const user = await editExperienceByUserName(req.params.username, req.body);
        return res.json({ user });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
router.get('/:username', auth, async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.params.username);
        return res.json({ user });
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=router.js.map