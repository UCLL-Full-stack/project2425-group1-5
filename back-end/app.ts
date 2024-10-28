import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import doctorService from './service/doctor.service';
import patientService from './service/patient.service';
import appointmentService from './service/appointment.service';
import { appointmentRouter } from './controller/appointment.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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
})

app.get('/patients/:id', async(req,res, next: NextFunction) =>{
    try{
        const id = parseInt(req.params.id);
        const patient = await patientService.getPatientById(id);
        res.status(200).json(patient);
    }catch(error){
        next(error);
    }
})

app.get('/upcomingAppointments', async(req,res,next : NextFunction) =>{
    try{
        const upcomingAppointments = await appointmentService.getUpcomingAppointments();
        res.status(200).json(upcomingAppointments);
    }catch(error){
        next(error);
    }
})

app.use('/appointments', appointmentRouter);





app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

