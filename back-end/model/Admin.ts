import { User } from "./User";

export class Admin{
    private id?: number;
    private user: User;

    constructor(admin:{
        id?:number;
        user: User;
    }){
        this.validate(admin);
        this.id = admin.id;
        this.user = admin.user;
    }
    
    validate(admin:{
        id?:number;
        user: User;
    }){
        if(!admin.user){
            throw new Error("Admin's user information is required.");
        }  
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    equals(admin : Admin): boolean {
        return (
            this.id === admin.getId() &&
            this.user.equals(admin.getUser()) 
        );
    }

}