import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export class Appointment{
    private id?: number;
    private startTime : Date;
    private endTime : Date;
    private status : string;
    private date : Date;
    private doctor : Doctor;
    private patient : Patient;

    constructor(appointment:{
        id?:number;
        startTime : Date;
        endTime : Date;
        status : string;
        date : Date;
        doctor: Doctor;
        patient : Patient;
    }){
        this.validate(appointment);
        this.id = appointment.id;
        this.startTime = appointment.startTime;
        this.endTime = appointment.endTime;
        this.status = appointment.status;
        this.date = appointment.date;
        this.doctor = appointment.doctor;
        this.patient = appointment.patient;
    }

    validate(appointment:{
        startTime : Date;
        endTime : Date;
        status : string;
        date : Date;
        doctor : Doctor;
        patient : Patient;
    }){
        if(!appointment.startTime){
            throw new Error('Appointment\'s Start time is required.');
        }
        if(!appointment.endTime){
            throw new Error('Appointment\'s End time is required.');
        }
        if (appointment.startTime > appointment.endTime) {
            throw new Error('Start time cannot be after end time');
        }
        if(!appointment.status){
            throw new Error('Appointment\'s Status is required.');
        }        
        if(!appointment.date){
            throw new Error('Appointment\'s date is required.');
        }
        if (!appointment.doctor) {
            throw new Error("Appointment's doctor is required.");
        }
        if (!appointment.patient) {
            throw new Error("Appointment's patient is required.");
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
    getDoctor(): Doctor{
        return this.doctor;
    }
    getPatient(): Patient{
        return this.patient;
    }

    equals(appointment: Appointment): boolean{
        return(
            this.id === appointment.getId()&&
            this.startTime === appointment.getStartTime()&&
            this.endTime === appointment.getEndTime()&&
            this.status === appointment.getStatus()&&
            this.doctor === appointment.getDoctor() &&
            this.patient === appointment.getPatient()
        );
    }


}