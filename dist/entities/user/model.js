import mongoose from "mongoose";
const Users = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 100,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true,
        min: 6
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: "",
        max: 150
    },
    location: {
        type: String,
        default: ""
    },
    followers: [{
            type: String,
            ref: "Users"
        }],
    following: [{
            type: String,
            ref: "Users"
        }],
    interests: [String],
    keyWords: [String],
    education: [{
            type: {
                date_start: Date,
                date_end: Date,
                school: String,
                title: String,
                discipline: String,
                description: String
            },
        }],
    experience: [{
            type: {
                date_start: Date,
                date_end: Date,
                position: String,
                company: String,
                location: String,
                description: String
            }
        }],
    rol: {
        type: String,
        default: "user",
        enum: ["user", "company"]
    },
    contacts: [String]
}, { versionKey: false }));
export default Users;
//# sourceMappingURL=model.js.map