import mongoose from "mongoose";

const JobVacancies = mongoose.model('JobVacancies',new mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },
    charge_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    last_day: {
        type: Date,
        required: true
    },
    user_postulated: [{}],
    location: {
        type: String,
        required: true
    },
    question_one: {
        type: String,
        default: null
    },
    question_two: {
        type: String,
        default: null
    },
    question_three: {
        type: String,
        default: null
    }
}, { versionKey: false }));

export default JobVacancies;