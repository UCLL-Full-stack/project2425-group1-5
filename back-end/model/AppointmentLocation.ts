import { Appointment } from "./Appointment";
import {
    Appointment as AppointmentPrisma,
    AppointmentLocation as AppointmentLocationPrisma
} from '@prisma/client';

export class AppointmentLocation{
    private id?: number;
    private street_number : number;
    private city : string;
    private postal_code: number;
    private appointments : Appointment[]

    constructor(appointmentLocation:{
        id?:number;
        street_number : number;
        city : string;
        postal_code : number;
        appointments?: Appointment[]
    }){
        this.validate(appointmentLocation);
        this.id = appointmentLocation.id;
        this.street_number = appointmentLocation.street_number;
        this.city = appointmentLocation.city;
        this.postal_code = appointmentLocation.postal_code;
        this.appointments = appointmentLocation.appointments || [];
    }

    validate(appointmentLocation: {
        street_number : number;
        city : string;
        postal_code : number;
        appointments?: Appointment[] 
    }) {
        if (!appointmentLocation.street_number) {
            throw new Error('Street Number is required.');
        }
        if (!appointmentLocation.city) {
            throw new Error('City is required.');
        }
        if (!appointmentLocation.postal_code) {
            throw new Error('Postal Code is required.');
        }

    }

    getId(): number | undefined {
        return this.id;
    }
    getStreetNumber(): number{
        return this.street_number;
    }
    getCity():string{
        return this.city;
    }
    getPostalCode(): number{
        return this.postal_code;
    }
    getAppointments() : Appointment[]{
        return this.appointments;
    }

    equals(appointmentLocation : AppointmentLocation): boolean{
        return(
            this.id === appointmentLocation.getId() &&
            this.street_number === appointmentLocation.getStreetNumber()&&
            this.city === appointmentLocation.getCity()&&
            this.postal_code === appointmentLocation.getPostalCode()&&
            this.appointments.every((appointment, index) =>appointment.equals(appointmentLocation.getAppointments()[index]))

        );
    }

    static from({
        id,
        street_number,
        city,
        postal_code
    }: AppointmentLocationPrisma ){
        return new AppointmentLocation({
            id,
            street_number,
            city,
            postal_code,
        })
    }

}