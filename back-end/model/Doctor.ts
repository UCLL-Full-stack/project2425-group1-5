import { Appointment } from "./Appointment";
import { User } from "./User";

export class Doctor{
    private id?: number;
    private user: User;
    private speciality : string;
    private availability :boolean;
    private appointments : Appointment[];

    constructor(doctor:{
        id?:number;
        user: User;
        speciality : string;
        availability : boolean;
        appointments?: Appointment[];
    }){
        this.id = doctor.id;
        this.user = doctor.user;
        this.speciality = doctor.speciality;
        this.availability = doctor.availability;
        this.appointments = doctor.appointments || [];
    }
    
    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getSpeciality(): string {
        return this.speciality;
    }

    getAvailability(): boolean {
        return this.availability;
    }

    getAppointments(): Appointment[]{
        return this.appointments;
    }

    equals(doctor : Doctor): boolean {
        return (
            this.id === doctor.getId() &&
            this.user.equals(doctor.getUser())&&
            this.speciality  === doctor.getSpeciality()&&
            this.availability === doctor.getAvailability()&&
            this.appointments.length === doctor.getAppointments().length &&
            this.appointments.every((appointment, index) =>appointment.equals(doctor.getAppointments()[index]))
        );
    }

}