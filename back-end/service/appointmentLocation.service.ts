import { AppointmentLocation } from "../model/AppointmentLocation";
import appointmentLocationDb from "../repository/appointmentLocation.db";

const getAllAppointmentLocations = async(): Promise<AppointmentLocation[]> =>{
    return appointmentLocationDb.getAllAppointmentLocations();
};

const getAppointmentLocationById = async(id: number) : Promise<AppointmentLocation | null> =>{
    return appointmentLocationDb.getAppointmentLocationById({id});
}

export default {
    getAllAppointmentLocations,
    getAppointmentLocationById
};