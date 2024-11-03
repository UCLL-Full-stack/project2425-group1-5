import { Doctor } from "../model/Doctor";
import { User } from "../model/User";

const doctors = [
    new Doctor({
        id: 1,
        user: new User({
            id: 1,
            name: 'Dr. John Smith',
            email: 'john.smith@hospital.com',
            password: 'smith123',
            role: 'doctor',
        }),
        speciality: 'Cardiology',
        availability: true,
        appointments: [],
    }),
    new Doctor({
        id: 2,
        user: new User({
            id: 2,
            name: 'Dr. Emily Jones',
            email: 'emily.jones@hospital.com',
            password: 'jones123',
            role: 'doctor',
        }),
        speciality: 'Neurology',
        availability: false,
        appointments: [],
    }),
    new Doctor({
        id: 3,
        user: new User({
            id: 3,
            name: 'Dr. Michel Brown',
            email: 'michael.brown@hospital.com',
            password: 'brown123',
            role: 'doctor',
        }),
        speciality: 'Pediatrics',
        availability: true,
        appointments: [],
    }),
    new Doctor({
        id: 4,
        user: new User({
            id: 4,
            name: 'Dr. Sarah Wilson',
            email: 'sarah.wilson@hospital.com',
            password: 'wilson123',
            role: 'doctor',
        }),
        speciality: 'Orthopedics',
        availability: true,
        appointments: [],
    }),
    new Doctor({
        id: 5,
        user: new User({
            id: 5,
            name: 'Dr. David Miller',
            email: 'david.miller@hospital.com',
            password: 'miller123',
            role: 'doctor',
        }),
        speciality: 'General Medicine',
        availability: false,
        appointments: [],
    }),
];

const getAllDoctors = (): Doctor[] =>{
    return doctors;
}

const getDoctorById = ({id}:{id: number}) : Doctor| null =>{
    try{
        return doctors.find((doctor) => doctor.getId()=== id) || null;
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
} 

export default{
    getAllDoctors,
    getDoctorById
};