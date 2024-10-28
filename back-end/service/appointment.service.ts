import { Appointment } from "../model/Appointment";
import doctorDb from "../repository/doctor.db";
import appointmentDb from "../repository/appointment.db";
import { AppointmentInput } from "../types";
import patientDb from "../repository/patient.db";

const createAppointment= async({startTime,endTime,status,date,doctor, patient}: AppointmentInput) : Promise<Appointment> =>{
    
    if(!doctor?.id){
        throw new Error('Doctor id is required')
    }
    if(!patient?.id){
        throw new Error('Patient id is required')
    }

    const addedDoctor = await doctorDb.getDoctorById({id: doctor.id!});
    if(!addedDoctor){
        throw new Error('Doctor not found with given ID.');
    }

    const addedPatient = await patientDb.getPatientById({id: patient.id!});
    if(!addedPatient){
        throw new Error('Patient not found with given ID.');
    }

    const existingAppointment = await appointmentDb.getAppointmentByDoctorAndPatient({doctorId: doctor.id, patientId: patient.id});
    if (existingAppointment){
        throw new Error('This appointment is already been scheduled.');
    }

    const appointment = new Appointment({startTime, endTime, status,date, doctor: addedDoctor, patient: addedPatient});

    const inputAppointment = appointmentDb.createAppointment(appointment);
    return inputAppointment;
    
}

const getUpcomingAppointments = async() : Promise<Appointment[]>=>{
    const allApointments = appointmentDb.getAllAppointments();

    const now = new Date();

    const upcomingAppointments = allApointments.filter((appointment) => new Date(appointment.getDate()) > now);

    return upcomingAppointments;
}


export default {createAppointment , getUpcomingAppointments}