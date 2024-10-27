import { User } from "./User";

export class Doctor{
    private id?: number;
    private user: User;
    private speciality : string;
    private availability :boolean;

    constructor(doctor:{
        id?:number;
        user: User;
        speciality : string;
        availability : boolean;
    }){
        this.id = doctor.id;
        this.user = doctor.user;
        this.speciality = doctor.speciality;
        this.availability = doctor.availability;
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


    equals(doctor : Doctor): boolean {
        return (
            this.id === doctor.getId() &&
            this.user.equals(doctor.getUser())&&
            this.speciality  === doctor.getSpeciality()&&
            this.availability === doctor.getAvailability()
        );
    }

}