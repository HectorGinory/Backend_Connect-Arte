import _ from 'lodash'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export const auth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(400).json({message: "NO_TOKEN"})
    }
    const token = req.headers.authorization.split(' ')[1]
    try {
        console.log(token)
        req.token = jwt.verify(token, config.SECRET)
        next()
    } catch(e) {
        return res.status(401).json({message: "NO_AUTH"})
    }
}

export const sameUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    req.token = jwt.decode(token, config.SECRET)
    console.log(req.token, req.params.username)
    if(req.token.username !== req.params.username) {
        return res.status(401).json({message: "NO_AUTH"})
    }
    next()
}