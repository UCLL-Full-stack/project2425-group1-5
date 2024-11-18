import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { AppointmentLocation } from "./AppointmentLocation";
import {
    Doctor as DoctorPrisma,
    Patient as PatientPrisma,
    User as UserPrisma,
    Service as ServicePrisma,
    AppointmentLocation as AppointmentLocationPrisma,
    Appointment as AppointmentPrisma

} from '@prisma/client';
import appointmentLocationDb from "../repository/appointmentLocation.db";

export class Appointment{
    private id?: number;
    private start_time : Date;
    private end_time : Date;
    private status : string;
    private date : Date;
    private doctor : Doctor;
    private patient : Patient;
    private location : AppointmentLocation;

    constructor(appointment:{
        id?:number;
        start_time : Date;
        end_time : Date;
        status : string;
        date : Date;
        doctor: Doctor;
        patient : Patient;
        location : AppointmentLocation;
    }){
        this.validate(appointment);
        this.id = appointment.id;
        this.start_time = appointment.start_time;
        this.end_time = appointment.end_time;
        this.status = appointment.status;
        this.date = appointment.date;
        this.doctor = appointment.doctor;
        this.patient = appointment.patient;
        this.location = appointment.location;
    }

    validate(appointment:{
        start_time : Date;
        end_time : Date;
        status : string;
        date : Date;
        doctor : Doctor;
        patient : Patient;
        location : AppointmentLocation;
    }){
        if(!appointment.start_time){
            throw new Error('Appointment\'s Start time is required.');
        }
        if(!appointment.end_time){
            throw new Error('Appointment\'s End time is required.');
        }
        if (appointment.start_time > appointment.end_time) {
            throw new Error('Start time cannot be after end time.');
        }
        if(!appointment.status){
            throw new Error('Appointment\'s Status is required.');
        }        
        if(!appointment.date){
            throw new Error('Appointment\'s Date is required.');
        }
        if (!appointment.doctor) {
            throw new Error("Appointment's Doctor is required.");
        }
        if (!appointment.patient) {
            throw new Error("Appointment's patient is required.");
        }
        if(!appointment.location){
            throw new Error("Appointment should have a location.");
        }

    }

    getId(): number | undefined {
        return this.id;
    }

    getStartTime(): Date {
        return this.start_time;
    }

    getEndTime(): Date {
        return this.end_time;
    }
    getStatus(): string{
        return this.status;
    }
    getDate(): Date{
        return this.date;
    }
    getDoctor(): Doctor{
        return this.doctor;
    }
    getPatient(): Patient{
        return this.patient;
    }
    getLocation(): AppointmentLocation{
        return this.location;
    }

    equals(appointment: Appointment): boolean{
        return(
            this.id === appointment.getId()&&
            this.start_time === appointment.getStartTime()&&
            this.end_time === appointment.getEndTime()&&
            this.status === appointment.getStatus()&&
            this.doctor === appointment.getDoctor() &&
            this.patient === appointment.getPatient()&&
            this.location === appointment.getLocation()
        );
    }

    static from ({
        id,
        start_time,
        end_time,
        status,
        date,
        doctor,
        patient,
        location,
    }: AppointmentPrisma & {doctor: DoctorPrisma & { user: UserPrisma; service: ServicePrisma };patient: PatientPrisma & { user: UserPrisma }; location : AppointmentLocationPrisma}){
        return new Appointment({
            id,
            start_time,
            end_time,
            status,
            date,
            doctor : Doctor.from(doctor),
            patient : Patient.from(patient),
            location : AppointmentLocation.from(location)
        });
    }


}