import { Patient } from "../model/Patient";
import { User } from "../model/User";
import database from "./database";
// const patients = [
//     new Patient({
//         id: 1,
//         user: new User({
//             id: 1,
//             name: 'Alice Johnson',
//             email: 'alice.johnson@hospital.com',
//             password: 'alice123',
//             role: 'patient',
//         }),
//         appointments: [],
//     }),
//     new Patient({
//         id: 2,
//         user: new User({
//             id: 2,
//             name: 'Bob Williams',
//             email: 'bob.williams@hospital.com',
//             password: 'bob123',
//             role: 'patient',
//         }),
//         appointments: [],
//     }),
//     new Patient({
//         id: 3,
//         user: new User({
//             id: 3,
//             name: 'Carla Brown',
//             email: 'carla.brown@hospital.com',
//             password: 'carla123',
//             role: 'patient',
//         }),
//         appointments: [],
//     }),
//     new Patient({
//         id: 4,
//         user: new User({
//             id: 4,
//             name: 'David Smith',
//             email: 'david.smith@hospital.com',
//             password: 'david123',
//             role: 'patient',
//         }),
//         appointments: [],
//     }),
//     new Patient({
//         id: 5,
//         user: new User({
//             id: 5,
//             name: 'Ella Davis',
//             email: 'ella.davis@hospital.com',
//             password: 'ella123',
//             role: 'patient',
//         }),
//         appointments: [],
//     }),
// ];

// const getPatientById = ({id}:{id: number}) : Patient| null =>{
//     try{
//         return patients.find((patient) => patient.getId()=== id) || null;
//     }catch(error){
//         console.log(error);
//         throw new Error('Database error. See server log for details.');
//     }
// } 
const getPatientById = async({id}:{id: number}) : Promise<Patient| null> =>{
    try{
        const patientById = await database.patient.findUnique({
            where : {id},
            include  : {
                user : true,
            },
        });
        return patientById ? Patient.from(patientById) : null;
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
} 
const getAllPatients = async(): Promise<Patient[]> =>{
    try{
        const patientsPrisma = await database.patient.findMany({
            include : {
                user : true,
            }
        });
        return patientsPrisma.map((patientsPrisma) => Patient.from(patientsPrisma));
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }

}
// const getAllPatients = (): Patient[] =>{
//     return patients;
// }
export default{
    getPatientById,
    getAllPatients
};


