import { Appointment } from "./Appointment";
import { User } from "./User";
import { Service } from "./Service";
import {
    User as UserPrisma,
    Appointment as AppointmentPrisma,
    Service as ServicePrisma,
    Doctor as DoctorPrisma,
} from '@prisma/client';

export class Doctor{
    private id?: number;
    private user: User;
    private speciality : string;
    private availability :boolean;
    private service : Service;
    private appointments : Appointment[];

    constructor(doctor:{
        id?:number;
        user: User;
        speciality : string;
        availability : boolean;
        service : Service;
        appointments?: Appointment[];
    }){
        this.validate(doctor);
        this.id = doctor.id;
        this.user = doctor.user;
        this.speciality = doctor.speciality;
        this.availability = doctor.availability;
        this.service = doctor.service;
        this.appointments = doctor.appointments || [];
    }
    
    validate(doctor:{
        id?:number;
        user: User;
        speciality : string;
        availability : boolean;
        service : Service
        appointments?: Appointment[];
    }){
        if(!doctor.user){
            throw new Error("Doctor's user information is required.");
        }
        if(!doctor.speciality){
            throw new Error("Doctor's speciality is required.");
        }
        if(!doctor.service){
            throw new Error("A Doctor must provide atleast one service.");
        }
        if(doctor.availability === undefined){
            throw new Error("Doctor's availability status is required.");
        }
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

    getService(): Service{
        return this.service;
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
            this.service === doctor.getService()&&
            this.appointments.length === doctor.getAppointments().length &&
            this.appointments.every((appointment, index) =>appointment.equals(doctor.getAppointments()[index]))
        );
    }

    static from({
        id,
        user,
        speciality,
        availability,
        service,
        appointments = [],
    }: DoctorPrisma & {user : UserPrisma; service : ServicePrisma, appointments?: AppointmentPrisma[]}){
        return new Doctor({
            id,
            user : User.from(user),
            speciality,
            availability,
            service : Service.from(service),
            // appointments: appointments.map(appointment => Appointment.from(appointment))
        });
    }

}