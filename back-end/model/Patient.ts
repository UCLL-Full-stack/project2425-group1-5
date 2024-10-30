import { User } from "./User";
import { Appointment } from "./Appointment";

export class Patient{
    private id?: number;
    private user: User;
    private appointments: Appointment[];

    constructor(patient:{
        id?:number;
        user: User;
        appointments?: Appointment[];
    }){
        this.validate(patient);
        this.id = patient.id;
        this.user = patient.user;
        this.appointments = patient.appointments || [];
    }

    validate(patient:{
        id?:number;
        user: User;
        appointments?: Appointment[];
    }){
        if(!patient.user){
            throw new Error("Patient's user information is required.");
        }  
    }
    
    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }
    getAppointments(): Appointment[]{
        return this.appointments;
    }

    equals(patient : Patient): boolean {
        return (
            this.id === patient.getId() &&
            this.user.equals(patient.getUser())&&
            this.appointments.length === patient.getAppointments().length &&
            this.appointments.every((appointment, index) =>appointment.equals(patient.getAppointments()[index]))
        );
    }

}