import Users from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';
const createToken = (user) => {
    const token = jwt.sign({ email: user.email, id: user._id, name: user.name, interests: user.interests, username: user.username, rol: user.rol }, config.SECRET);
    return token;
};
export const createUser = async (newUser) => {
    newUser.password = await bcrypt.hash(newUser.password, 1);
    const user = new Users(newUser);
    return await user.save();
};
export const userLogIn = async (user) => {
    const findUser = await Users.findOne({ email: user.email }).select('+password');
    if (!findUser)
        throw new Error('NO_USER');
    if (!(await bcrypt.compare(user.password, findUser.password)))
        throw new Error('WRONG_PASSWORD');
    const token = createToken(findUser);
    return token;
};
export const getUserByUsername = async (username) => {
    const findUser = await Users.findOne({ username: username });
    if (!findUser)
        throw new Error('NO_USER');
    return findUser;
};
export const editInfoByUserName = async (username, newInfo) => {
    const attributesToUpdate = {};
    if (newInfo.name !== "" && newInfo.name.length <= 20)
        attributesToUpdate.name = newInfo.name;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newInfo.email !== "" && !emailRegex.test(newInfo.email))
        attributesToUpdate.email = newInfo.email;
    if (newInfo.username !== "" && newInfo.username.split(" ").length <= 1)
        attributesToUpdate.username = newInfo.username;
    if (newInfo.description !== "" && newInfo.description.length <= 150)
        attributesToUpdate.description = newInfo.description;
    if (newInfo.location !== "")
        attributesToUpdate.location = newInfo.location;
    if (newInfo.rol !== "")
        attributesToUpdate.rol = newInfo.rol;
    if (newInfo.interests !== "")
        attributesToUpdate.interests = newInfo.interests.split(", ");
    if (newInfo.keyWords !== "")
        attributesToUpdate.keyWords = newInfo.keyWords.split(", ");
    const findUser = await Users.findOneAndUpdate({ username: username }, attributesToUpdate, { new: true });
    if (!findUser)
        throw new Error("NO_USER_FOUND");
    return createToken(findUser);
};
export const editEducationByUserName = async (username, newInfo) => {
    const findUser = await Users.findOne({ username: username });
    if (!findUser)
        throw new Error('NO_USER');
    newInfo.date_start = new Date(newInfo.date_start);
    newInfo.date_end = new Date(newInfo.date_end);
    newInfo.id = findUser.education.length + 1;
    findUser.education.push(newInfo);
    findUser.education.sort((a, b) => {
        var dateA = new Date(a.date_start);
        var dateB = new Date(b.date_start);
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
    await findUser.save();
    return findUser;
};
export const deleteEducationByUserName = async (username, removeEducation) => {
    const findUser = await Users.findOne({ username: username });
    if (!findUser)
        return;
    findUser.education.forEach(element => {
        console.log(element);
    });
    console.log(removeEducation);
    const indexRemove = findUser.education.findIndex((education) => education._id.toString() === removeEducation._id);
    findUser.education.splice(indexRemove, 1);
    findUser.save();
    return findUser;
};
export const deleteExperienceByUserName = async (username, removeExperience) => {
    const findUser = await Users.findOne({ username: username });
    if (!findUser)
        return;
    findUser.experience.forEach(element => {
        console.log(element);
    });
    console.log(removeExperience);
    const indexRemove = findUser.experience.findIndex((experience) => experience._id.toString() === removeExperience._id);
    findUser.experience.splice(indexRemove, 1);
    findUser.save();
    return findUser;
};
export const editExperienceByUserName = async (username, newInfo) => {
    const findUser = await Users.findOne({ username: username });
    if (!findUser)
        throw new Error('NO_USER');
    newInfo.date_start = new Date(newInfo.date_start);
    newInfo.date_end = new Date(newInfo.date_end);
    findUser.experience.push(newInfo);
    findUser.experience.sort((a, b) => {
        var dateA = new Date(a.date_start);
        var dateB = new Date(b.date_start);
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
    await findUser.save();
    return findUser;
};
export const bringUsersByInterests = async (regExp) => {
    const users = await Users.find({
        keyWords: {
            $elemMatch: {
                $regex: regExp
            }
        }
    }).limit(10);
    return users;
};
export const bringUsersByRegExp = async (regExp) => {
    const users = await Users.find({
        username: {
            $regex: regExp
        }
    });
    return users;
};
//# sourceMappingURL=controller.js.map