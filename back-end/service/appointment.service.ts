import { Appointment } from "../model/Appointment";
import doctorDb from "../repository/doctor.db";
import appointmentDb from "../repository/appointment.db";
import { AppointmentInput } from "../types";
import patientDb from "../repository/patient.db";
import appointmentLocationDb from "../repository/appointmentLocation.db";

const getUpcomingAppointments = async() : Promise<Appointment[]>=>{
    const allApointments = await appointmentDb.getAllAppointments();

    const now = new Date();

    const upcomingAppointments =allApointments.filter((appointment: Appointment) => new Date(appointment.getDate()) > now);

    return upcomingAppointments;
}


const getAllAppointments = async() : Promise<Appointment[]> =>{
    return appointmentDb.getAllAppointments();
}

const getAppointmentById= (id: number) : Appointment |null=>{
    return appointmentDb.getAppointmentById({id});
}

const addAppointment = async({id,start_time, end_time,status,date,doctor,patient, location}: AppointmentInput) : Promise<Appointment> =>{

    if(!doctor?.id){
        throw new Error('Doctor id is required.');
    }
    if(!patient?.id){
        throw new Error('Patient id is required.');
    }

    const addedDoctor = await doctorDb.getDoctorById({id: doctor.id!});
    if(!addedDoctor){
        throw new Error('Doctor not found with the given ID.');
    }
    const addedPatient = await patientDb.getPatientById({id: patient.id!});
    if(!addedPatient){
        throw new Error('Patient not found with the given ID.');
    }
    const addedLocation = await appointmentLocationDb.getAppointmentLocationById({id: location.id!});
    if(!addedLocation){
        throw new Error('Location not found with the given ID.');
    }


    const existingAppointment = await appointmentDb.getAppointmentByDoctorAndPatient({doctorId: doctor.id, patientId : patient.id});
    if(existingAppointment){
        throw new Error('This appointment is already scheduled.');
    }

    
    const appointment = new Appointment({start_time,end_time,status,date,doctor: addedDoctor,patient: addedPatient, location : addedLocation });

    const inputAppointment = appointmentDb.addAppointment(appointment);
    return inputAppointment;

}

export default { addAppointment, getUpcomingAppointments, getAllAppointments, getAppointmentById}