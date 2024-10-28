/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Doctor:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              type: object
 *              properties:
 *                 id:
 *                   type : number
 *                 name:
 *                   type : string
 *                 email:
 *                   type : string
 *                 password:
 *                   type : string
 *            speciality:
 *              type: string
 *              description: Doctor's speciality.
 *            availability:
 *              type: boolean
 */
import express, { NextFunction, Request, Response } from 'express';
import doctorService from '../service/doctor.service';

const doctorRouter = express.Router();
doctorRouter.get('/', async(req:Request, res: Response)=>{
    try{
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
});



doctorRouter.get('/' , async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params.id,);
        const doctor = await doctorService.getDoctorById(id);
        res.status(200).json(doctor);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
})


export {doctorRouter};