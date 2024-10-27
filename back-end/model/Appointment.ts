import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export class Appointment{
    private id?: number;
    private startTime : Date;
    private endTime : Date;
    private status : string;
    private date : Date;
    private doctors : Doctor[];
    private patients : Patient[];

    constructor(appointment:{
        id?:number;
        startTime : Date;
        endTime : Date;
        status : string;
        date : Date;
        doctors: Doctor[];
        patients : Patient[];
    }){
        this.validate(appointment);
        this.id = appointment.id;
        this.startTime = appointment.startTime;
        this.endTime = appointment.endTime;
        this.status = appointment.status;
        this.date = appointment.date;
        this.doctors = appointment.doctors;
        this.patients = appointment.patients;
    }

    validate(appointment:{
        startTime : Date;
        endTime : Date;
        status : string;
        date : Date;
    }){
        if(!appointment.startTime){
            throw new Error('Appointment\'s Start time is required.');
        }
        if(!appointment.endTime){
            throw new Error('Appointment\'s End time is required.');
        }
        if(!appointment.status){
            throw new Error('Appointment\'s Status is required.');
        }        
        if(!appointment.date){
            throw new Error('Appointment\'s date is required.');
        }

    }

    getId(): number | undefined {
        return this.id;
    }

    getStartTime(): Date {
        return this.startTime;
    }

    getEndTime(): Date {
        return this.endTime;
    }
    getStatus(): string{
        return this.status;
    }
    getDate(): Date{
        return this.date;
    }
    getDoctors(): Doctor[]{
        return this.doctors;
    }
    getPatients(): Patient[]{
        return this.patients;
    }

    equals(appointment: Appointment): boolean{
        return(
            this.id === appointment.getId()&&
            this.startTime === appointment.getStartTime()&&
            this.endTime === appointment.getEndTime()&&
            this.status === appointment.getStatus()&&
            this.doctors.every((doctor, index) => doctor.equals(appointment.getDoctors()[index]))&&
            this.patients.every((patient, index) => patient.equals(appointment.getPatients()[index]))
        );
    }


}