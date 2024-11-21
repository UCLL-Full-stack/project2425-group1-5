/**
 * @swagger
 *   components:
 *    schemas:
 *      Appointment:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            startTime:
 *              type: string
 *              format: date-time
 *            endTime:
 *              type: string
 *              format: date-time
 *            status:
 *              type: string
 *            date:
 *              type: string
 *              format: date-time
 *            doctor:
 *              $ref: '#/components/schemas/Doctor'
 *            patient:
 *              $ref: '#/components/schemas/Patient'
 *      AppointmentInput:
 *          type: object
 *          properties:
 *            startTime:
 *              type: string
 *              format: date-time
 *            endTime:
 *              type: string
 *              format: date-time
 *            status:
 *              type: string
 *            date:
 *              type: string
 *              format: date-time
 *            doctor:
 *              type: object
 *              properties:
 *                  id:
 *                    type: number
 *                    format: int64
 *            patient:
 *              type: object
 *              properties:
 *                  id:
 *                    type: number
 *                    format: int64

 */

import express, { NextFunction, Request, Response } from 'express';
import appointmentService from '../service/appointment.service';
import { AppointmentInput } from '../types';


/**
 * @swagger
 * /appointments:
 *   post:
 *      summary : Create a new appointment for existing doctor and patient.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AppointmentInput'
 *      responses:
 *         200:
 *            description: The appointment is created.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Appointment'
 */
const appointmentRouter = express.Router();
appointmentRouter.post('/', async(req:Request, res: Response)=>{
    // try{
        const appointment = <AppointmentInput>req.body;
        const result = await appointmentService.addAppointment(appointment);
        res.status(200).json(result);
    // }catch(error){
    //     res.status(400).json({status:'error'});
    // }
})

/**
 * @swagger
 * /upcomingAppointments:
 *   get:
 *     summary: Get a list of all upcoming appointments.
 *     responses:
 *       "200":
 *         description: A Json Array of upcoming appointments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 */
appointmentRouter.get('/', async(req: Request, res: Response)=>{
    try{
        const upcomingAppointments = await appointmentService.getUpcomingAppointments();
        res.status(200).json(upcomingAppointments);
    }catch(error){
        res.status(400).json({status:'error'});
    }
})

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get a list of all appointments.
 *     responses:
 *       "200":
 *         description: A Json Array of appointments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 */
appointmentRouter.get('/', async(req:Request, res: Response)  =>{
    try{
        const appointments = await appointmentService.getAllAppointments();
        res.status(200).json(appointments);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
});

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get a list of appointments by given id.
 *     parameters:
 *        - in : path
 *          name : id
 *          schema:
 *            type : number
 *          required : true
 *          description : The id of appointment to be retrieved
 *     responses:
 *       "200":
 *         description: A Json Array of appointments
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Appointment'
 */
appointmentRouter.get('/' , async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params.id,);
        const appointment = await appointmentService.getAppointmentById(id);
        res.status(200).json(appointment);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
})

export {appointmentRouter}