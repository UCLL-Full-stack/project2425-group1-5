/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      AppointmentLocation:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            street_number:
 *              type: number
 *              format: int64
 *            city:
 *              type: string
 *            postal_code:
 *              type: number
 *              format: int64
 */

import appointmentLocationService from "../service/appointmentLocation.service";

import express, { NextFunction, Request, Response } from 'express';


/**
 * @swagger
 * /appointmentLocations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all appointments.
 *     responses:
 *       "200":
 *         description: A Json Array of appointments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentLocation'
 */
const appointmentLocationsRouter = express.Router();
appointmentLocationsRouter.get('/', async(req:Request, res: Response)  =>{
    try{
        const appointmentLocations = await appointmentLocationService.getAllAppointmentLocations();
        res.status(200).json(appointmentLocations);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
});


/**
 * @swagger
 * /appointmentLocations/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of appointment locations by given id.
 *     parameters:
 *        - in : path
 *          name : id
 *          schema:
 *            type : number
 *          required : true
 *          description : The id of appointment location to be retrieved
 *     responses:
 *       "200":
 *         description: A Json Array of appointment locations
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AppointmentLocation'
 */
appointmentLocationsRouter.get('/' , async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params.id,);
        const appointmentLocation = await appointmentLocationService.getAppointmentLocationById(id);
        res.status(200).json(appointmentLocation);
    }catch(error){
        res.status(400).json({status: 'error'});
    }
});

export {appointmentLocationsRouter}
