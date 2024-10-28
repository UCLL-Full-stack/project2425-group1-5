import express, { NextFunction, Request, Response } from 'express';
import appointmentService from '../service/appointment.service';
import { AppointmentInput } from '../types';

const appointmentRouter = express.Router();

appointmentRouter.post('/', async(req: Request, res: Response) =>{
    try{
        const appointment = <AppointmentInput>req.body;
        const result = await appointmentService.createAppointment(appointment);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({status:'error'});
    }
});

appointmentRouter.get('/', async(req: Request, res: Response)=>{
    try{
        const upcomingAppointments = await appointmentService.getUpcomingAppointments();
        res.status(200).json(upcomingAppointments);
    }catch(error){
        res.status(400).json({status:'error'});
    }
})

export {appointmentRouter}