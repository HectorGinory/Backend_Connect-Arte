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
    user_postulated: [String],
    location: {
        type: String,
        required: true
    },
}, { versionKey: false }));

export default JobVacancies;