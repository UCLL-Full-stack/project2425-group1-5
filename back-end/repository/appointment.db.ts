import { Doctor } from "../model/Doctor";
import { Appointment } from "../model/Appointment";
import { AppointmentInput } from "../types";
import { User } from "../model/User";
import { Patient } from "../model/Patient";
import { Service } from "../model/Service";
import { AppointmentLocation } from "../model/AppointmentLocation";
import database from "./database";

const service1 = new Service({
    name: "Cardiology",
    description: "Heart care services",
    price: 150,
    doctors: [],
});

const service2 = new Service({
    name: "Neurology",
    description: "Nervous system care services",
    price: 200,
    doctors: [],
});

const service3 = new Service({
    name: "General medicine",
    description: "Acute and Chronic illnesses care services",
    price: 200,
    doctors: [],
});

const location1 = new AppointmentLocation({
    id: 1,
    street_number: 123,
    city: "New York",
    postal_code: 10001,
    appointments: []
});
const location2 = new AppointmentLocation({
    id: 2,
    street_number: 456,
    city: "Los Angeles",
    postal_code: 90001,
    appointments: []
});

const location3 = new AppointmentLocation({
    id: 3,
    street_number: 789,
    city: "Chicago",
    postal_code: 60601,
    appointments: []
});

// Creating doctors
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
        service : service1,
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
        service: service2,
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
        availability: true,
        service : service3,
        appointments: [],
    }),
];

// Creating patients
const patients = [
    new Patient({
        id: 1,
        user: new User({
            id: 1,
            name: 'Alice Johnson',
            email: 'alice.johnson@hospital.com',
            password: 'alice123',
            role: 'patient',
        }),
        appointments: [],
    }),
    new Patient({
        id: 2,
        user: new User({
            id: 2,
            name: 'Bob Williams',
            email: 'bob.williams@hospital.com',
            password: 'bob123',
            role: 'patient',
        }),
        appointments: [],
    }),
    new Patient({
        id: 5,
        user: new User({
            id: 5,
            name: 'Ella Davis',
            email: 'ella.davis@hospital.com',
            password: 'ella123',
            role: 'patient',
        }),
        appointments: [],
    }),
];

// Creating appointments (2 in the future, 1 in the past)
const appointments = [
    new Appointment({
        id: 1,
        start_time: new Date('2024-10-10T10:00:00'),
        end_time: new Date('2024-10-10T11:00:00'),
        status: 'Scheduled',
        date: new Date('2024-10-10'),
        doctor: doctors[0],
        patient: patients[0],
        location : location1
    }),
    new Appointment({
        id: 2,
        start_time: new Date('2024-11-15T14:00:00'),
        end_time: new Date('2024-11-15T15:00:00'),
        status: 'Scheduled',
        date: new Date('2024-11-15'),
        doctor: doctors[1],
        patient: patients[1],
        location : location2
    }),
    new Appointment({
        id: 3,
        start_time: new Date('2023-10-05T09:00:00'),
        end_time: new Date('2023-10-05T10:00:00'),
        status: 'Completed',
        date: new Date('2023-10-05'),
        doctor: doctors[0],
        patient: patients[1],
        location : location3
    }),
];

// const appointments : Appointment[] = [];

const getAllAppointments = async(): Promise<Appointment[]> => {
    try{
        const appointmentsPrisma = await database.appointment.findMany({
            include : {doctor : {
                include : {
                    user : true,
                    service : true
                }
            }, patient : {
                include : {
                    user : true
                }
            }, location : true}
        });
        return appointmentsPrisma.map((appointmentsPrisma)=> Appointment.from(appointmentsPrisma));
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }

};


const addAppointment = (appointment : Appointment) =>{
    appointments.push(appointment);
    return appointment;
}

const getAppointmentByDoctorAndPatient = ({
    doctorId,
    patientId,
}:{
    doctorId: number;
    patientId : number;
}): Appointment | undefined =>{
    return appointments.find(
        (appointment) =>
            appointment.getDoctor().getId() === doctorId &&
            appointment.getPatient().getId() === patientId
    );
};

const getAppointmentById = ({id}:{id:number}): Appointment|null =>{
    try{
        return appointments.find((appointment) => appointment.getId()=== id) || null;
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllAppointments,
    addAppointment,
    getAppointmentByDoctorAndPatient,
    getAppointmentById

};