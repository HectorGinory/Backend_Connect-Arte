import Users from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';

export const createUser = async(newUser) => {
    newUser.password = await bcrypt.hash(newUser.password,1);
    const user =  new Users(newUser);
    return await user.save();
};

export const userLogIn = async(user) => {
    const findUser = await Users.findOne({email: user.email}).select('+password')
    if(!findUser) throw new Error('NO_USER')
    if(!(await bcrypt.compare(user.password, findUser.password))) throw new Error('WRONG_PASSWORD')
    const token = jwt.sign({email: user.email, id: findUser._id, name:findUser.name, username:findUser.username}, config.SECRET)
    return token
}

export const getUserByUsername =async (username) => {
    const findUser = await Users.findOne({username: username})
    if(!findUser) throw new Error('NO_USER')
    return findUser
}

export const editInfoByUserName = async (username, newInfo) => {
    const attributesToUpdate:any = {}
    if(newInfo.name !== "") attributesToUpdate.name = newInfo.name
    if(newInfo.email !== "") attributesToUpdate.email = newInfo.email
    if(newInfo.username !== "") attributesToUpdate.username = newInfo.username
    if(newInfo.description !== "") attributesToUpdate.description = newInfo.description
    if(newInfo.location !== "") attributesToUpdate.location = newInfo.location
    const findUser = await Users.findOneAndUpdate({ username: username }, attributesToUpdate, { new: true });
    return findUser
}

export const editEducationByUserName = async (username, newInfo:any) => {
    const findUser = await Users.findOne({ username: username });
    if(!findUser) throw new Error ('NO_USER')
    newInfo.date_start = new Date(newInfo.date_start)
    newInfo.date_end = new Date(newInfo.date_end)
    findUser.education.push(newInfo)
    findUser.education.sort((a:any, b:any) => {
        var dateA = new Date(a.date_start);
        var dateB = new Date(b.date_start);
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      })
    await findUser.save()
    return findUser
}

export const editExperienceByUserName = async (username, newInfo:any) => {
    const findUser = await Users.findOne({ username: username });
    if(!findUser) throw new Error ('NO_USER')
    newInfo.date_start = new Date(newInfo.date_start)
    newInfo.date_end = new Date(newInfo.date_end)
    findUser.experience.push(newInfo)
    findUser.experience.sort((a:any, b:any) => {
        var dateA = new Date(a.date_start);
        var dateB = new Date(b.date_start);
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      })
    await findUser.save()
    return findUser
}