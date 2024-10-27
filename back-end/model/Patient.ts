import { User } from "./User";

export class Patient{
    private id?: number;
    private user: User;

    constructor(patient:{
        id?:number;
        user: User;
    }){
        this.id = patient.id;
        this.user = patient.user;
    }
    
    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    equals(patient : Patient): boolean {
        return (
            this.id === patient.getId() &&
            this.user.equals(patient.getUser()) 
        );
    }

}