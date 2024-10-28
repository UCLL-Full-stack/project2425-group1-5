import { Doctor } from "../model/Doctor";
import { Appointment } from "../model/Appointment";
import { AppointmentInput } from "../types";
import { User } from "../model/User";
import { Patient } from "../model/Patient";

// Creating doctors
const doctors = [
    new Doctor({
        id: 1,
        user: new User({
            id: 1,
            name: 'dr.John Smith',
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
            name: 'dr.Emily Jones',
            email: 'emily.jones@hospital.com',
            password: 'jones123',
            role: 'doctor',
        }),
        speciality: 'Neurology',
        availability: false,
        appointments: [],
    }),
];

// Creating patients
const patients = [
    new Patient({
        id: 1,
        user: new User({
            id: 6,
            name: 'Alice Brown',
            email: 'alice.brown@hospital.com',
            password: 'alice123',
            role: 'patient',
        }),
    }),
    new Patient({
        id: 2,
        user: new User({
            id: 7,
            name: 'Bob White',
            email: 'bob.white@hospital.com',
            password: 'bob123',
            role: 'patient',
        }),
    }),
];

// Creating appointments (2 in the future, 1 in the past)
const appointments = [
    new Appointment({
        id: 1,
        startTime: new Date('2024-10-10T10:00:00'),
        endTime: new Date('2024-10-10T11:00:00'),
        status: 'Scheduled',
        date: new Date('2024-10-10'),
        doctor: doctors[0],
        patient: patients[0],
    }),
    new Appointment({
        id: 2,
        startTime: new Date('2024-11-15T14:00:00'),
        endTime: new Date('2024-11-15T15:00:00'),
        status: 'Scheduled',
        date: new Date('2024-11-15'),
        doctor: doctors[1],
        patient: patients[1],
    }),
    new Appointment({
        id: 3,
        startTime: new Date('2023-10-05T09:00:00'),
        endTime: new Date('2023-10-05T10:00:00'),
        status: 'Completed',
        date: new Date('2023-10-05'),
        doctor: doctors[0],
        patient: patients[1],
    }),
];

// const appointments : Appointment[] = [];

const getAllAppointments = (): Appointment[] => {
    return appointments;
};

const getAppointmentByDoctorAndPatient = ({
    doctorId,
    patientId,
}:{
    doctorId : number;
    patientId : number;
}): Appointment | null=>{
    const appointment = appointments.find(
        (appointment) =>
            appointment.getDoctor().getId() === doctorId &&
            appointment.getPatient().getId() === patientId
    );
    // if (!appointment) {
    //     throw new Error(`No appointment found for doctorId ${doctorId} and patientId ${patientId}`);
    // }

    return appointment || null;
};

const createAppointment = (appointment : Appointment) =>{
    appointments.push(appointment);
    return appointment;
}

export default {
    getAllAppointments,
    getAppointmentByDoctorAndPatient,
    createAppointment
};