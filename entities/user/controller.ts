import Users from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';
import { create } from 'domain';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createToken = (user) => {
  const token = jwt.sign({email: user.email, id: user._id, name:user.name,interests: user.interests , username:user.username, rol: user.rol, following: user.following}, config.SECRET)
  return token
}
export const createUser = async(newUser) => {
  const { email, password, name, username } = newUser;
  if (!emailRegex.test(email)) throw new Error("WRONG_EMAIL_FORMAT")
  if (!passwordRegex.test(password)) throw new Error("WRONG_PASSWORD_FORMAT")
  if (name.length > 20) throw new Error("WRONG_NAME_FORMAT")
  if (username.split(" ").length > 1) throw new Error("WRONG_USERNAME_FORMAT")
    newUser.password = await bcrypt.hash(newUser.password,1);
    const user =  new Users(newUser);
    await user.save()
    return createToken(user);
};

export const userLogIn = async(user) => {
    const findUser = await Users.findOne({email: user.email}).select('+password')
    if(!findUser) throw new Error('NO_USER')
    if(!(await bcrypt.compare(user.password, findUser.password))) throw new Error('WRONG_PASSWORD')
    const token = createToken(findUser)
    return token
}

export const getUserByUsername =async (username) => {
    const findUser = await Users.findOne({username: username})
    if(!findUser) throw new Error('NO_USER')
    return findUser
}

export const editInfoByUserName = async (username, newInfo) => {
    const attributesToUpdate:any = {}
    if(newInfo.name !== "" && newInfo.name.length <= 20) attributesToUpdate.name = newInfo.name
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(newInfo.email !== ""  && !emailRegex.test(newInfo.email)) attributesToUpdate.email = newInfo.email
    if(newInfo.username !== "" && newInfo.username.split(" ").length <= 1) attributesToUpdate.username = newInfo.username
    if(newInfo.description !== "" && newInfo.description.length <= 150) attributesToUpdate.description = newInfo.description
    if(newInfo.location !== "") attributesToUpdate.location = newInfo.location
    if(newInfo.rol !== "") attributesToUpdate.rol = newInfo.rol
    if(newInfo.interests !== "") attributesToUpdate.interests = newInfo.interests.split(", ")
    if(newInfo.keyWords !== "") attributesToUpdate.keyWords = newInfo.keyWords.split(", ")
    const findUser = await Users.findOneAndUpdate({ username: username }, attributesToUpdate, { new: true });
    if(!findUser) throw new Error("NO_USER")
    return createToken(findUser)
}

export const deleteEducationByUserName = async (username, removeEducation) => {
  const findUser: any = await Users.findOne({ username: username });
  if(!findUser) throw new Error("NO_USER")
  return await removeItemFromUserArray(findUser, "education", removeEducation)
}

const removeItemFromUserArray = async (findUser, array, removeItem) => {
  const indexRemove = findUser[array].findIndex((item) => item._id.toString() === removeItem._id)
  findUser[array].splice(indexRemove, 1)
  findUser.save()
  return findUser
}
export const deleteExperienceByUserName = async (username, removeExperience) => {
  const findUser: any = await Users.findOne({ username: username });
  if(!findUser) throw new Error("NO_USER")
  return await removeItemFromUserArray(findUser, "experience", removeExperience)
}
export const editEducationByUserName = async (username, newInfo:any) => {
  const findUser = await Users.findOne({ username: username });
  if(!findUser) throw new Error ('NO_USER')
  return await insertInArrayOfUser(findUser, "education", newInfo)
}

const insertInArrayOfUser = async (findUser, array, newInfo) => {
  newInfo.date_start = new Date(newInfo.date_start)
  newInfo.date_end = new Date(newInfo.date_end)
  findUser[array].push(newInfo)
  findUser[array].sort((a:any, b:any) => {
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
}

export const editExperienceByUserName = async (username, newInfo:any) => {
    const findUser = await Users.findOne({ username: username });
    if(!findUser) throw new Error ('NO_USER')
    return await insertInArrayOfUser(findUser, "experience", newInfo)
}

export const bringUsersByInterests = async(regExp) => {
  let filter
  console.log(regExp)
  if(!regExp) {
    filter = {} 
  } else {
    filter = {
      keyWords: {
        $elemMatch: {
          $regex: regExp
        }
      }
    }
  }
  const users = await Users.find(filter).limit(6);
  return users
}

export const bringUsersByRegExp = async(regExp) => {
  const users = await Users.find({
    username: {
      $regex: regExp
    }
  })
  return users
}

export const followUser = async(userFollowing, userFollow) => {
  const followUser:any = await Users.findOne({username: userFollow})
    if(!followUser) throw new Error ('NO_USER')
  const user:any = await Users.findOne({username: userFollowing.username})
  if(!user) throw new Error ('NO_USER')
  followUser.followers?.push(user._id)
  user.following?.push(followUser._id)
  await followUser.save()
  await user.save()
  return createToken(user)
}

export const unfollowUser = async(userFollowing, userFollow) => {
  const followUser:any = await Users.findOne({username: userFollow})
    if(!followUser) throw new Error ('NO_USER')
  const user:any = await Users.findOne({username: userFollowing.username})
  if(!user) throw new Error ('NO_USER')
  followUser.followers.splice(followUser.followers.indexOf(user._id), 1)
  user.following.splice(user.following.indexOf(followUser._id), 1)
  console.log()
  await followUser.save()
  await user.save()
  return createToken(user)
}