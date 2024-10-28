/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Patient:
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
 */
import express, { NextFunction, Request, Response } from 'express';
import patientService from '../service/patient.service';


const patientRouter = express.Router();

patientRouter.get('/' , async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params.id,);
        const patient = await patientService.getPatientById(id);
        res.status(200).json(patient);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
})

export{patientRouter};