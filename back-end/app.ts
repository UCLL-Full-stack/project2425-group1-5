import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import doctorService from './service/doctor.service';
import patientService from './service/patient.service';
import appointmentService from './service/appointment.service';
import { appointmentRouter } from './controller/appointment.routes';
import { userRouter } from './controller/user.routes';
import appointmentLocationService from './service/appointmentLocation.service';
import helmet from 'helmet';


const app = express();

app.use(helmet());


dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//Routes defined before expressJWT will not be secure.
app.use(
    expressjwt({
        secret : process.env.JWT_SECRET|| 'default_secret',
        algorithms : ['HS256'],
    }).unless({
        path : ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status', '/doctors', '/appointments'],
    })
);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.get('/doctors', async(req,res, next: NextFunction)=>{
    try{
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
    }catch(error){
        next(error);
    }
});

app.get('/doctors/:id', async(req,res, next: NextFunction) =>{
    try{
        const id = parseInt(req.params.id);
        const doctor = await doctorService.getDoctorById(id);
        res.status(200).json(doctor);
    }catch(error){
        next(error);
    }
});

app.get('/patients', async(req,res, next: NextFunction)=>{
    try{
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    }catch(error){
        next(error);
    }
});

app.get('/patients/:id', async(req,res, next: NextFunction) =>{
    try{
        const id = parseInt(req.params.id);
        const patient = await patientService.getPatientById(id);
        res.status(200).json(patient);
    }catch(error){
        next(error);
    }
});

app.get('/appointmentLocations', async(req,res, next: NextFunction)=>{
    try{
        const appointmentLocations = await appointmentLocationService.getAllAppointmentLocations();
        res.status(200).json(appointmentLocations);
    }catch(error){
        next(error);
    }
});

app.get('/appointmentLocations/:id', async(req,res, next: NextFunction) =>{
    try{
        const id = parseInt(req.params.id);
        const appointmentLocation = await appointmentLocationService.getAppointmentLocationById(id);
        res.status(200).json(appointmentLocation);
    }catch(error){
        next(error);
    }
})


app.get('/appointments/update/:id', async(req,res, next: NextFunction) =>{
    try{
        const id = parseInt(req.params.id);
        const appointment = await appointmentService.getAppointmentById(id);
        res.status(200).json(appointment);
    }catch(error){
        next(error);
    }
});
app.get('/upcomingAppointments', async(req,res,next : NextFunction) =>{
    try{
        const upcomingAppointments = await appointmentService.getUpcomingAppointments();
        res.status(200).json(upcomingAppointments);
    }catch(error){
        next(error);
    }
})

// app.get('/appointments', async(req,res,next : NextFunction) =>{
//     try{
//         const appointments = await appointmentService.getAllAppointments();
//         res.status(200).json(appointments);
//     }catch(error){
//         next(error);
//     }
// })

app.use('/appointments', appointmentRouter);
app.use('/users', userRouter)


const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MediAssit API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'MediAssistError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

