import { Doctor } from "../model/Doctor";
import { User } from "../model/User";
import { Service } from "../model/Service";
import database from "./database";

// const service1 = new Service({
//     name: "Cardiology",
//     description: "Heart care services",
//     price: 150,
//     doctors: [],
// });

// const service2 = new Service({
//     name: "Neurology",
//     description: "Nervous system care services",
//     price: 150,
//     doctors: [],
// });
// const service3 = new Service({
//     name: "Pediatrics",
//     description: "Child care services",
//     price: 150,
//     doctors: [],
// });

// const service4 = new Service({
//     name: "Orthopedics",
//     description: "Musculoskeleton system care services",
//     price: 150,
//     doctors: [],
// });

// const service5 = new Service({
//     name: "General Medicine",
//     description: "Acute and Chronic illnesses care services",
//     price: 150,
//     doctors: [],
// });

// const doctors = [
//     new Doctor({
//         id: 1,
//         user: new User({
//             id: 1,
//             name: 'Dr. John Smith',
//             email: 'john.smith@hospital.com',
//             password: 'smith123',
//             role: 'doctor',
//         }),
//         speciality: 'Cardiology',
//         availability: true,
//         service: service1,
//         appointments: [],
//     }),
//     new Doctor({
//         id: 2,
//         user: new User({
//             id: 2,
//             name: 'Dr. Emily Jones',
//             email: 'emily.jones@hospital.com',
//             password: 'jones123',
//             role: 'doctor',
//         }),
//         speciality: 'Neurology',
//         availability: false,
//         service: service2,
//         appointments: [],
//     }),
//     new Doctor({
//         id: 3,
//         user: new User({
//             id: 3,
//             name: 'Dr. Michel Brown',
//             email: 'michael.brown@hospital.com',
//             password: 'brown123',
//             role: 'doctor',
//         }),
//         speciality: 'Pediatrics',
//         availability: true,
//         service: service3,
//         appointments: [],
//     }),
//     new Doctor({
//         id: 4,
//         user: new User({
//             id: 4,
//             name: 'Dr. Sarah Wilson',
//             email: 'sarah.wilson@hospital.com',
//             password: 'wilson123',
//             role: 'doctor',
//         }),
//         speciality: 'Orthopedics',
//         availability: true,
//         service: service4,
//         appointments: [],
//     }),
//     new Doctor({
//         id: 5,
//         user: new User({
//             id: 5,
//             name: 'Dr. David Miller',
//             email: 'david.miller@hospital.com',
//             password: 'miller123',
//             role: 'doctor',
//         }),
//         speciality: 'General Medicine',
//         availability: false,
//         service:service5,
//         appointments: [],
//     }),
// ];

// const getAllDoctors = async(): Promise<Doctor[]> =>{
//     const result = await database.doctor.findMany({
//         include : {user: true, service :true, appointments : true},
//     });
//     return doctors;
// }
const getAllDoctors = async(): Promise<Doctor[]> =>{
    try{
        const doctorsPrisma = await database.doctor.findMany({
            include : {user: true, service :true, appointments : true,}
        });
        return doctorsPrisma.map((doctorsPrisma) => Doctor.from(doctorsPrisma));
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');        
    }
}
// const getDoctorById = ({id}:{id: number}) : Doctor| null =>{
//     try{
//         return doctors.find((doctor) => doctor.getId()=== id) || null;
//     }catch(error){
//         console.log(error);
//         throw new Error('Database error. See server log for details.');
//     }
// } 

const getDoctorById = async({id}:{id: number}) : Promise<Doctor| null> =>{
    try{
        const doctorById = await database.doctor.findUnique({
            where : {id},
            include : {
                user : true,
                service : true
            },
        });
        return doctorById ? Doctor.from(doctorById) : null;
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default{
    getAllDoctors,
    getDoctorById
};