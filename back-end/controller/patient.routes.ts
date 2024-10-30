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

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get a list of all patients.
 *     responses:
 *       "200":
 *         description: A Json Array of patients
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */
const patientRouter = express.Router();
patientRouter.get('/', async(req:Request, res: Response)=>{
    try{
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
});


/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a list of patients by given id.
 *     parameters:
 *        - in : path
 *          name : id
 *          schema:
 *            type : number
 *          required : true
 *          description : The id of patient to be retrieved
 *     responses:
 *       "200":
 *         description: A Json Array of patients
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Patient'
 */
patientRouter.get('/' , async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params.id,);
        const patient = await patientService.getPatientById(id);
        res.status(200).json(patient);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
});



export{patientRouter};