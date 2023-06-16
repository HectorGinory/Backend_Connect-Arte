import express from 'express';
import mongoose from 'mongoose';
import routerUser from './entities/user/router.js';
import routerVacancies from './entities/jobVacancies/router.js';
import config from './config.js';
import cors from 'cors';
export const app = express();
mongoose.connect(config.DDBB).then(() => {
    console.log('Connected to the database');
}).catch((e) => {
    console.log('ERROR:', e);
});
const handlerError = (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ code: 'SERVER_ERROR', message: err.message });
};
let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(express.json());
app.use(cors(corsOptions));
app.use('/user', routerUser);
app.use('/vacancies', routerVacancies);
app.use(handlerError);
app.listen(config.PORT, () => console.log(`Server up in port ${config.PORT}`));
//# sourceMappingURL=app.js.map