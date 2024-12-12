/**
 * @swagger
 *   components:
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            name:
 *              type: string
 *              description: Name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Name.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            password:
 *              type: string
 *              description: User password.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      UserInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: User name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            password:
 *              type: string
 *              description: User password.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [doctor, patient, admin]
 */
import express, { NextFunction, Request, Response } from 'express';
import { Role, UserInput } from '../types';
import userService from '../service/user.service';


const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request , res: Response, next: NextFunction) => {
    try {
        //see the sliddes
        const request = req as Request & {auth: { role: Role}};
        const role = request.auth;
        const users = await userService.getAllUsers( role);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
);

/**
 * @swagger
 * /users/signup:
 *   post:
 *      security:
 *       - bearerAuth : []
 *      summary: Create a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The created user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post(
    '/signup',
    async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const user = await userService.createUser(req.body as UserInput);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
)

/** 
 * @swagger
* /users/login:
*   post:
*      security:
*       - bearerAuth : []
*      summary: Login for a user
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/AuthenticationRequest'
*      responses:
*        200:
*          description: Successful authentication response with a JWT token.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/AuthenticationResponse'
*/
userRouter.post(
    '/login',
    async(req: Request, res: Response, next : NextFunction)=>{
        try{
            const userInput = req.body as UserInput
            const AuthenticationResponse = await userService.login(userInput);
            res.status(200).json({message: "Authentication successful", ...AuthenticationResponse});
        } catch (error) {
            next(error);
        }
    }
)

export { userRouter };

