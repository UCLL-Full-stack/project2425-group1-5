import { User } from "./User";

export class Admin{
    private id?: number;
    private user: User;

    constructor(admin:{
        id?:number;
        user: User;
    }){
        this.id = admin.id;
        this.user = admin.user;
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