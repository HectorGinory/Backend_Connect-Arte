import express from 'express';
import mongoose from 'mongoose';
import routerUser from './entities/user/router.js';
import routerVacancies from './entities/jobVacancies/router.js';
import config from './config.js';
import cors from 'cors'

export const app = express();

mongoose.connect(config.DDBB!).then(()=>{
    console.log('Connected to the database')
}).catch((e)=>{
    console.log('ERROR:', e)
})

const handlerError = (err:Error,req,res,next)=>{
  console.log(err)
    if(err.message === 'NO_TOKEN'){
      return res.status(404).json({code:err.message,message:"Debes tener ña sesión iniciada"});
    }
    if(err.message === 'NO_TOKEN'){
      return res.status(404).json({code:err.message,message:"Debes tener ña sesión iniciada"});
    }
    return res.status(500).json({code:'SERVER_ERROR', message: err.message});    
};

let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/user', routerUser)
app.use('/vacancies', routerVacancies)
app.use(handlerError);
app.listen(config.PORT, () => console.log(`Server up in port ${config.PORT}`));
